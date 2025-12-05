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
    <section className="newsletter">
      <div className="newsletter-inner">
        <h2 className="newsletter-title">{newsletterTitulo}</h2>
        <p className="newsletter-sub">{newsletterSubtitulo}</p>
        <form className="subscribe-form">
          <div className="email-input-wrap">
            <input
              type="email"
              placeholder={newsletterPlaceholder}
              className="email-input"
              required
            />
            <button type="submit" className="subscribe-btn">
              {newsletterBoton}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
