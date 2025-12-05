// components/ImpactMessage.tsx
interface ImpactMessageProps {
  configuracion: any;
}

export default function ImpactMessage({ configuracion }: ImpactMessageProps) {
  // Valores por defecto si no hay datos de Strapi
  const impactTag = configuracion?.impactTag || 'Nuestro compromiso';
  const impactTitulo = configuracion?.impactTitulo || 'Cada donación se convierte en oportunidades reales para quienes más lo necesitan';
  const impactSubtitulo = configuracion?.impactSubtitulo || 'Trabajamos todos los días para transformar vidas a través de la educación, la salud y el apoyo a comunidades vulnerables.';

  return (
    <section className="impact-msg">
      <div className="impact-msg-inner">
        <span className="impact-tag">{impactTag}</span>
        <h2 className="impact-title">
          {impactTitulo}
        </h2>
        <p className="impact-sub">
          {impactSubtitulo}
        </p>
      </div>
    </section>
  );
}
