// lib/strapi.ts
import qs from 'qs';
import type {
  StrapiResponse,
  StrapiData,
  HeroSlide,
  Iniciativa,
  StatGeneral,
  Testimonio,
  Configuracion,
  FormattedHeroSlide,
  FormattedIniciativa,
  FormattedStat,
  FormattedTestimonio,
  FormattedConfiguracion,
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// ===== BASE FETCH =====
async function fetchAPI<T>(
  endpoint: string,
  query: object = {},
  options: RequestInit = {}
): Promise<T> {
  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    next: { revalidate: 60 }, // Revalidar cada 60 segundos
  });

  if (!res.ok) {
    console.error(`Strapi error: ${res.status} ${res.statusText}`);
    throw new Error(`Failed to fetch from Strapi: ${endpoint}`);
  }

  return res.json();
}

// ===== HELPER: Get media URL =====
function getMediaUrl(media: { data: { attributes: { url: string } } | null } | null): string {
  if (!media?.data?.attributes?.url) return '';
  const url = media.data.attributes.url;
  // Si es URL absoluta, devolverla tal cual
  if (url.startsWith('http')) return url;
  // Si es relativa, agregar base URL de Strapi
  return `${STRAPI_URL}${url}`;
}

// ===== HERO SLIDES =====
export async function getHeroSlides(): Promise<FormattedHeroSlide[]> {
  const response = await fetchAPI<{ data: any[] }>(
    '/hero-slides',
    {
      populate: ['imagen'],
      sort: ['orden:asc'],
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    titulo: item.titulo,
    subtitulo: item.subtitulo,
    imagen: item.imagen?.url ? `${STRAPI_URL}${item.imagen.url}` : '',
    textoBoton: item.textoBoton,
  }));
}

// ===== INICIATIVAS =====
export async function getIniciativas(): Promise<FormattedIniciativa[]> {
  const response = await fetchAPI<{ data: any[] }>(
    '/iniciativas',
    {
      populate: ['imagen', 'stats', 'comoAyudamos'],
      sort: ['orden:asc'],
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    nombre: item.nombre,
    slug: item.slug,
    descripcionCorta: item.descripcionCorta,
    descripcionLarga: item.descripcionLarga,
    imagen: item.imagen?.url ? `${STRAPI_URL}${item.imagen.url}` : '',
    color: item.color,
    stats: item.stats || [],
    comoAyudamos: (item.comoAyudamos || []).map((a: any) => a.texto),
  }));
}

export async function getIniciativaBySlug(slug: string): Promise<FormattedIniciativa | null> {
  const response = await fetchAPI<{ data: any[] }>(
    '/iniciativas',
    {
      filters: { slug: { $eq: slug } },
      populate: ['imagen', 'stats', 'comoAyudamos'],
    }
  );

  if (!response.data.length) return null;

  const item = response.data[0];
  return {
    id: item.id,
    nombre: item.nombre,
    slug: item.slug,
    descripcionCorta: item.descripcionCorta,
    descripcionLarga: item.descripcionLarga,
    imagen: item.imagen?.url ? `${STRAPI_URL}${item.imagen.url}` : '',
    color: item.color,
    stats: item.stats || [],
    comoAyudamos: (item.comoAyudamos || []).map((a: any) => a.texto),
  };
}

// ===== STATS =====
export async function getStats(): Promise<FormattedStat[]> {
  const response = await fetchAPI<{ data: any[] }>(
    '/stat-generals',
    {
      sort: ['orden:asc'],
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    numero: item.numero,
    etiqueta: item.etiqueta,
  }));
}

// ===== TESTIMONIOS =====
export async function getTestimonios(): Promise<FormattedTestimonio[]> {
  const response = await fetchAPI<{ data: any[] }>(
    '/testimonios',
    {
      filters: { activo: { $eq: true } },
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    quote: item.quote,
    autor: item.autor,
    año: item.anio,
  }));
}

// ===== CONFIGURACIÓN =====
export async function getConfiguracion(): Promise<FormattedConfiguracion | null> {
  try {
    const response = await fetchAPI<{ data: any }>(
      '/configuracion',
      {
        populate: ['logoBlanco', 'logoColor', 'redesSociales'],
      }
    );

    const item = response.data;
    return {
      logoBlanco: item.logoBlanco?.url ? `${STRAPI_URL}${item.logoBlanco.url}` : '',
      logoColor: item.logoColor?.url ? `${STRAPI_URL}${item.logoColor.url}` : '',
      telefono: item.telefono,
      email: item.email,
      direccion: item.direccion,
      montosDonacion: item.montosDonacion || [50, 100, 200, 500, 1000],
      redesSociales: item.redesSociales || [],
    };
  } catch {
    return null;
  }
}

// ===== GET ALL DATA (para la página principal) =====
export async function getHomePageData() {
  const [heroSlides, iniciativas, stats, testimonios, configuracion] = await Promise.all([
    getHeroSlides().catch(() => []),
    getIniciativas().catch(() => []),
    getStats().catch(() => []),
    getTestimonios().catch(() => []),
    getConfiguracion().catch(() => null),
  ]);

  return {
    heroSlides,
    iniciativas,
    stats,
    testimonios,
    configuracion,
  };
}
