// components/About.tsx
interface AboutProps {
  textosSitio: any;
}

export default function About({ textosSitio }: AboutProps) {
  const aboutTitulo = textosSitio?.aboutTitulo || 'Acerca de nosotros';
  const aboutParrafo1 = textosSitio?.aboutParrafo1 || 'La Fundación Posadas trabaja desde hace más de una década transformando vidas a través de programas educativos, de salud y apoyo comunitario.';
  const aboutParrafo2 = textosSitio?.aboutParrafo2 || 'Nuestro compromiso es crear oportunidades reales para las familias más vulnerables de México.';

  return (
    <section className="about" id="nosotros">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-heading">{aboutTitulo}</h2>
          <p className="about-text">{aboutParrafo1}</p>
          <p className="about-text">{aboutParrafo2}</p>
        </div>
        <div className="about-visual">
          <img src="/assets/fotos/AdobeStock_1299452762.jpeg" alt="Fundación Posadas" />
        </div>
      </div>
    </section>
  );
}
