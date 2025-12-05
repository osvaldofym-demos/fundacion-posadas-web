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
  const response = await fetchAPI<StrapiResponse<StrapiData<HeroSlide>[]>>(
    '/hero-slides',
    {
      populate: ['imagen'],
      sort: ['orden:asc'],
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    titulo: item.attributes.titulo,
    subtitulo: item.attributes.subtitulo,
    imagen: getMediaUrl(item.attributes.imagen),
    textoBoton: item.attributes.textoBoton,
  }));
}

// ===== INICIATIVAS =====
export async function getIniciativas(): Promise<FormattedIniciativa[]> {
  const response = await fetchAPI<StrapiResponse<StrapiData<Iniciativa>[]>>(
    '/iniciativas',
    {
      populate: ['imagen', 'stats', 'comoAyudamos'],
      sort: ['orden:asc'],
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    nombre: item.attributes.nombre,
    slug: item.attributes.slug,
    descripcionCorta: item.attributes.descripcionCorta,
    descripcionLarga: item.attributes.descripcionLarga,
    imagen: getMediaUrl(item.attributes.imagen),
    color: item.attributes.color,
    stats: item.attributes.stats || [],
    comoAyudamos: (item.attributes.comoAyudamos || []).map((a) => a.texto),
  }));
}

export async function getIniciativaBySlug(slug: string): Promise<FormattedIniciativa | null> {
  const response = await fetchAPI<StrapiResponse<StrapiData<Iniciativa>[]>>(
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
    nombre: item.attributes.nombre,
    slug: item.attributes.slug,
    descripcionCorta: item.attributes.descripcionCorta,
    descripcionLarga: item.attributes.descripcionLarga,
    imagen: getMediaUrl(item.attributes.imagen),
    color: item.attributes.color,
    stats: item.attributes.stats || [],
    comoAyudamos: (item.attributes.comoAyudamos || []).map((a) => a.texto),
  };
}

// ===== STATS =====
export async function getStats(): Promise<FormattedStat[]> {
  const response = await fetchAPI<StrapiResponse<StrapiData<StatGeneral>[]>>(
    '/stats-generales',
    {
      sort: ['orden:asc'],
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    numero: item.attributes.numero,
    etiqueta: item.attributes.etiqueta,
  }));
}

// ===== TESTIMONIOS =====
export async function getTestimonios(): Promise<FormattedTestimonio[]> {
  const response = await fetchAPI<StrapiResponse<StrapiData<Testimonio>[]>>(
    '/testimonios',
    {
      filters: { activo: { $eq: true } },
    }
  );

  return response.data.map((item) => ({
    id: item.id,
    quote: item.attributes.quote,
    autor: item.attributes.autor,
    año: item.attributes.año,
  }));
}

// ===== CONFIGURACIÓN =====
export async function getConfiguracion(): Promise<FormattedConfiguracion | null> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiData<Configuracion>>>(
      '/configuracion',
      {
        populate: ['logoBlanco', 'logoColor', 'redesSociales'],
      }
    );

    const attrs = response.data.attributes;
    return {
      logoBlanco: getMediaUrl(attrs.logoBlanco),
      logoColor: getMediaUrl(attrs.logoColor),
      telefono: attrs.telefono,
      email: attrs.email,
      direccion: attrs.direccion,
      montosDonacion: attrs.montosDonacion || [50, 100, 200, 500, 1000],
      redesSociales: attrs.redesSociales || [],
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
