// components/About.tsx
import Link from 'next/link';

interface AboutProps {
  textosSitio: any;
}

export default function About({ textosSitio }: AboutProps) {
  // Si no hay datos de Strapi, usar los textos originales
  const aboutTitulo = textosSitio?.aboutTitulo || 'Más de 20 años transformando vidas';
  const aboutParrafo1 = textosSitio?.aboutParrafo1 || 'Fundación Posadas es el brazo social de Grupo Posadas. Desde 2001, trabajamos para mejorar la calidad de vida de miles de familias mexicanas a través de programas de educación, salud y apoyo a damnificados.';
  const aboutParrafo2 = textosSitio?.aboutParrafo2 || '';

  return (
    <section id="nosotros" className="about">
      <div className="about-inner">
        <div className="about-content">
          <span className="about-tag">NOSOTROS</span>
          <h2 className="about-title">{aboutTitulo}</h2>
          <p className="about-text">{aboutParrafo1}</p>
          {aboutParrafo2 && <p className="about-text">{aboutParrafo2}</p>}
          <Link href="/historia" className="about-link">
            Conoce nuestra historia
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
