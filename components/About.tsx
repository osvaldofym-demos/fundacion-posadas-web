// components/About.tsx
import Link from 'next/link';

export default function About() {
  return (
    <section id="nosotros" className="about">
      <div className="about-inner">
        <div className="about-content">
          <span className="about-tag">NOSOTROS</span>
          <h2 className="about-title">Más de 20 años transformando vidas</h2>
          <p className="about-text">
            Fundación Posadas es el brazo social de Grupo Posadas. Desde 2001, trabajamos 
            para mejorar la calidad de vida de miles de familias mexicanas a través de 
            programas de educación, salud y apoyo a damnificados.
          </p>
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
