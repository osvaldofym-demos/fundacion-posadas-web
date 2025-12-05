// components/Newsletter.tsx
'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (email && accepted) {
      // Aquí conectarías con tu backend/Strapi
      console.log('Subscribing:', email);
      setSubmitted(true);
    }
  };

  const isValid = email.includes('@') && accepted;

  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <h2 className="newsletter-title">Mantente informado</h2>
        <p className="newsletter-sub">
          Recibe noticias sobre nuestro impacto y cómo tu apoyo está cambiando vidas.
        </p>

        {!submitted ? (
          <div className="subscribe-form">
            <div className="email-input-wrap">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="subscribe-btn"
                disabled={!isValid}
                onClick={handleSubmit}
              >
                Suscribirme
              </button>
            </div>
            <div className="checkbox-wrap">
              <input
                type="checkbox"
                id="acceptComms"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <label htmlFor="acceptComms">
                Acepto recibir comunicaciones de Fundación Posadas. Puedo cancelar mi suscripción en cualquier momento.
              </label>
            </div>
          </div>
        ) : (
          <div className="success-msg show">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            ¡Gracias por suscribirte!
          </div>
        )}
      </div>
    </section>
  );
}
