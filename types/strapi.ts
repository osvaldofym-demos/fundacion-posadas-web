// types/strapi.ts

// ===== STRAPI BASE TYPES =====
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

// ===== COMPONENTS =====
export interface Stat {
  id: number;
  numero: string;
  etiqueta: string;
}

export interface AyudaItem {
  id: number;
  texto: string;
}

export interface RedSocial {
  id: number;
  nombre: string;
  url: string;
  icono: string;
}

// ===== CONTENT TYPES =====
export interface HeroSlide {
  titulo: string;
  subtitulo: string;
  imagen: StrapiMedia;
  textoBoton: string;
  orden: number;
}

export interface Iniciativa {
  nombre: string;
  slug: string;
  descripcionCorta: string;
  descripcionLarga: string;
  imagen: StrapiMedia;
  color: string;
  stats: Stat[];
  comoAyudamos: AyudaItem[];
  orden: number;
}

export interface StatGeneral {
  numero: string;
  etiqueta: string;
  orden: number;
}

export interface Testimonio {
  quote: string;
  autor: string;
  año: string;
  activo: boolean;
}

export interface Configuracion {
  logoBlanco: StrapiMedia;
  logoColor: StrapiMedia;
  telefono: string;
  email: string;
  direccion: string;
  montosDonacion: number[];
  redesSociales: RedSocial[];
}

// ===== FORMATTED TYPES (for components) =====
export interface FormattedHeroSlide {
  id: number;
  titulo: string;
  subtitulo: string;
  imagen: string;
  textoBoton: string;
}

export interface FormattedIniciativa {
  id: number;
  nombre: string;
  slug: string;
  descripcionCorta: string;
  descripcionLarga: string;
  imagen: string;
  color: string;
  stats: Stat[];
  comoAyudamos: string[];
}

export interface FormattedStat {
  id: number;
  numero: string;
  etiqueta: string;
}

export interface FormattedTestimonio {
  id: number;
  quote: string;
  autor: string;
  año: string;
}

export interface FormattedConfiguracion {
  logoBlanco: string;
  logoColor: string;
  telefono: string;
  email: string;
  direccion: string;
  montosDonacion: number[];
  redesSociales: RedSocial[];
}
