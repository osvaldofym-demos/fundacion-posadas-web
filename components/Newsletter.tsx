// components/Newsletter.tsx
interface NewsletterProps {
  textosSitio: any;
}

export default function Newsletter({ textosSitio }: NewsletterProps) {
  const newsletterTitulo = textosSitio?.newsletterTitulo || 'Mantente informado';
  const newsletterSubtitulo = textosSitio?.newsletterSubtitulo || 'Suscríbete a nuestro boletín para recibir noticias sobre nuestros programas e impacto.';
  const newsletterPlaceholder = textosSitio?.newsletterPlaceholder || 'Tu email';
  const newsletterBoton = textosSitio?.newsletterBoton || 'Suscribirse';

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-text">
          <h2 className="newsletter-title">{newsletterTitulo}</h2>
          <p className="newsletter-subtitle">{newsletterSubtitulo}</p>
        </div>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder={newsletterPlaceholder}
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-btn">
            {newsletterBoton}
          </button>
        </form>
      </div>
    </section>
  );
}
