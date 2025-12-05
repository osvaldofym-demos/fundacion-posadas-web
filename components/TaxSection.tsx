// components/TaxSection.tsx
export default function TaxSection() {
  return (
    <section className="tax-section">
      <div className="tax-card">
        <div className="tax-icon">
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M21 5c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3" />
          </svg>
        </div>
        <div className="tax-content">
          <h3 className="tax-title">Tu donación es deducible de impuestos</h3>
          <p className="tax-desc">
            Como donataria autorizada, todas las donaciones a Fundación Posadas 
            son deducibles de impuestos. Recibirás tu recibo fiscal por correo electrónico.
          </p>
        </div>
      </div>
    </section>
  );
}
