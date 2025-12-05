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
    <section className="donation-section" id="donacion">
      <div className="donation-content">
        <h2 className="donation-title">{donacionTitulo}</h2>
        <p className="donation-subtitle">{donacionSubtitulo}</p>
        
        <div className="donation-amounts">
          {montosDonacion.map((amount: number) => (
            <button key={amount} className="amount-btn">
              ${amount}
            </button>
          ))}
        </div>
        
        <button className="donation-btn-main">
          {donacionBoton}
        </button>
      </div>
    </section>
  );
}
