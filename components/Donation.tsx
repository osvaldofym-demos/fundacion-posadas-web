// components/Donation.tsx
'use client';

import { useState } from 'react';

interface DonationProps {
  montos?: number[];
}

const defaultMontos = [50, 100, 200, 500, 1000];

export default function Donation({ montos }: DonationProps) {
  const amounts = montos && montos.length > 0 ? montos : defaultMontos;
  const [selectedAmount, setSelectedAmount] = useState(amounts[1] || 100);
  const [customAmount, setCustomAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value, 10));
    }
  };

  const handleDonate = () => {
    if (selectedAmount >= 10) {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
  };

  const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;

  return (
    <>
      <section id="donar" className="donation">
        <div className="donation-inner">
          <div className="donation-left">
            <span className="donation-tag">HAZ LA DIFERENCIA</span>
            <h2 className="donation-title">Tu donación transforma vidas</h2>
            <p className="donation-desc">
              Cada peso cuenta. Con tu apoyo, más familias mexicanas tendrán acceso a educación, 
              salud y la esperanza de un mejor futuro.
            </p>
            <div className="donation-features">
              <div className="donation-feature">
                <svg width="20" height="20" fill="none" stroke="#5BA88F" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>Donación deducible de impuestos</span>
              </div>
              <div className="donation-feature">
                <svg width="20" height="20" fill="none" stroke="#5BA88F" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>Pago seguro con NetPay</span>
              </div>
            </div>
          </div>

          <div className="donation-right">
            <div className="donation-card">
              <h3 className="card-title">Selecciona tu donación</h3>

              <div className="amount-grid">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    className={`amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                    onClick={() => handleAmountClick(amount)}
                  >
                    <span className="amount-currency">$</span>
                    <span className="amount-val">{amount.toLocaleString()}</span>
                    <span className="amount-mxn">MXN</span>
                  </button>
                ))}
              </div>

              <div className="custom-wrap">
                <label className="custom-label">Otro monto</label>
                <div className="custom-input-wrap">
                  <span className="custom-prefix">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="custom-input"
                    value={customAmount}
                    onChange={handleCustomChange}
                  />
                  <span className="custom-suffix">MXN</span>
                </div>
              </div>

              <button className="donate-btn" onClick={handleDonate}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Donar ${finalAmount.toLocaleString()} MXN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-body">
              <div className="modal-icon-bg">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#8B7355">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="modal-title">Confirma tu donación</h3>

              <div className="modal-amount-box">
                <span className="modal-amount-label">Monto a donar</span>
                <span className="modal-amount-val">${finalAmount.toLocaleString()} MXN</span>
              </div>

              <div className="modal-checks">
                <div className="modal-check">
                  <svg width="20" height="20" fill="none" stroke="#5BA88F" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Recibirás tu recibo deducible por correo</span>
                </div>
                <div className="modal-check">
                  <svg width="20" height="20" fill="none" stroke="#5BA88F" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Transacción 100% segura con NetPay</span>
                </div>
              </div>

              <button className="modal-confirm-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Continuar al pago
              </button>

              <p className="modal-secure">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Conexión segura SSL
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
