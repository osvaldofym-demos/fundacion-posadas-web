// components/Donation.tsx
interface DonationProps {
  montos?: number[];
  textosSitio: any;
}

export default function Donation({ montos, textosSitio }: DonationProps) {
  const donacionTitulo = textosSitio?.donacionTitulo || 'Haz una donación';
  const donacionSubtitulo = textosSitio?.donacionSubtitulo || 'Tu aporte hace la diferencia en la vida de miles de familias mexicanas.';
  const donacionBoton = textosSitio?.donacionBoton || 'Dona ahora';
  
  const montosDonacion = montos || [50, 100, 200, 500, 1000];

  return (
    <section className="donation">
      <div className="donation-inner">
        <h2 className="donation-title">{donacionTitulo}</h2>
        <p className="donation-subtitle">{donacionSubtitulo}</p>
        
        <div className="donation-grid">
          {montosDonacion.map((amount: number) => (
            <button key={amount} className="donation-amount">
              ${amount}
            </button>
          ))}
        </div>
        
        <button className="btn-primary">
          {donacionBoton}
        </button>
      </div>
    </section>
  );
}
