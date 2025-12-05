// components/Iniciativas.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { FormattedIniciativa } from '@/types/strapi';

// Datos por defecto
const defaultIniciativas: FormattedIniciativa[] = [
  {
    id: 1,
    nombre: 'Educación',
    slug: 'educacion',
    descripcionCorta: 'Impulsamos el talento de estudiantes mexicanos con becas, capacitación y recursos que abren puertas.',
    descripcionLarga: 'Nuestro programa de educación está diseñado para brindar oportunidades a jóvenes talentosos de escasos recursos...',
    imagen: '/assets/fotos/AdobeStock_622012882.jpeg',
    color: '#8B7355',
    stats: [
      { id: 1, numero: '500+', etiqueta: 'Becas otorgadas' },
      { id: 2, numero: '85%', etiqueta: 'Tasa de graduación' },
      { id: 3, numero: '12', etiqueta: 'Estados beneficiados' },
    ],
    comoAyudamos: [
      'Becas completas para educación media superior y superior',
      'Programas de mentoría con profesionales de la industria hotelera',
      'Capacitación en habilidades técnicas y de empleabilidad',
      'Apoyo con materiales educativos y tecnología',
      'Oportunidades de prácticas profesionales en hoteles Posadas',
    ],
  },
  {
    id: 2,
    nombre: 'Apoyo a Damnificados',
    slug: 'damnificados',
    descripcionCorta: 'Actuamos rápidamente ante desastres naturales, brindando refugio, alimentos y esperanza a comunidades afectadas.',
    descripcionLarga: 'Cuando la naturaleza golpea, Fundación Posadas responde con acción inmediata...',
    imagen: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#E07B54',
    stats: [
      { id: 1, numero: '15', etiqueta: 'Estados atendidos' },
      { id: 2, numero: '3,500+', etiqueta: 'Familias apoyadas' },
      { id: 3, numero: '24hrs', etiqueta: 'Tiempo de respuesta' },
    ],
    comoAyudamos: [
      'Entrega de despensas y artículos de primera necesidad',
      'Apoyo para reconstrucción de viviendas',
      'Albergue temporal en hoteles de la cadena',
      'Atención médica y psicológica de emergencia',
      'Coordinación con autoridades locales y organizaciones',
    ],
  },
  {
    id: 3,
    nombre: 'Salud',
    slug: 'salud',
    descripcionCorta: 'Mejoramos la calidad de vida con programas de salud visual, auditiva y rehabilitación física.',
    descripcionLarga: 'La salud es fundamental para el desarrollo. Nuestros programas de salud visual y auditiva...',
    imagen: '/assets/fotos/AdobeStock_899688540.jpeg',
    color: '#5BA88F',
    stats: [
      { id: 1, numero: '10,000+', etiqueta: 'Familias beneficiadas' },
      { id: 2, numero: '2,500+', etiqueta: 'Lentes donados' },
      { id: 3, numero: '800+', etiqueta: 'Auxiliares auditivos' },
    ],
    comoAyudamos: [
      'Donación de auxiliares auditivos de alta calidad',
      'Entrega de lentes graduados para niños y adultos',
      'Terapias de rehabilitación física y ocupacional',
      'Jornadas de salud visual y auditiva en comunidades',
      'Atención médica especializada en convenio con hospitales',
    ],
  },
];

interface IniciativasProps {
  iniciativas?: FormattedIniciativa[];
}

export default function Iniciativas({ iniciativas }: IniciativasProps) {
  const data = iniciativas && iniciativas.length > 0 ? iniciativas : defaultIniciativas;
  const [activeModal, setActiveModal] = useState<FormattedIniciativa | null>(null);

  const openModal = (iniciativa: FormattedIniciativa) => {
    setActiveModal(iniciativa);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <section id="iniciativas" className="initiatives">
        <div className="section-header">
          <span className="section-tag">NUESTRAS INICIATIVAS</span>
          <h2 className="section-title">Programas que transforman</h2>
        </div>

        <div className="init-grid">
          {data.map((iniciativa, index) => (
            <article key={iniciativa.id} className="init-card">
              <div className="init-img-wrap">
                <Image
                  src={iniciativa.imagen}
                  alt={iniciativa.nombre}
                  fill
                  className="init-img"
                />
                <span className="init-num">{String(index + 1).padStart(2, '0')}</span>
                <div
                  className="init-badge"
                  style={{
                    background: iniciativa.color,
                  }}
                />
              </div>
              <div className="init-body">
                <h3 className="init-title">{iniciativa.nombre}</h3>
                <p className="init-desc">{iniciativa.descripcionCorta}</p>
                <button
                  className="init-link"
                  onClick={() => openModal(iniciativa)}
                >
                  Conocer más
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <div className="init-modal-overlay active" onClick={closeModal}>
          <div className="init-modal" onClick={(e) => e.stopPropagation()}>
            <div className="init-modal-header">
              <Image
                src={activeModal.imagen}
                alt={activeModal.nombre}
                fill
                className="init-modal-img"
              />
              <div className="init-modal-header-overlay" />
              <div className="init-modal-header-content">
                <div
                  className="init-modal-badge"
                  style={{ color: activeModal.color }}
                >
                  <span
                    className="init-modal-badge-dot"
                    style={{ background: activeModal.color }}
                  />
                  {activeModal.nombre.toUpperCase()}
                </div>
                <h3 className="init-modal-title">{activeModal.nombre}</h3>
                <p className="init-modal-subtitle">
                  {activeModal.stats[0]?.numero} {activeModal.stats[0]?.etiqueta.toLowerCase()}
                </p>
              </div>
              <button className="init-modal-close" onClick={closeModal}>
                <svg width="24" height="24" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="init-modal-body">
              <p className="init-modal-desc">{activeModal.descripcionLarga}</p>

              <div className="init-modal-stats">
                {activeModal.stats.map((stat) => (
                  <div key={stat.id} className="init-modal-stat-card">
                    <span
                      className="init-modal-stat-num"
                      style={{ color: activeModal.color }}
                    >
                      {stat.numero}
                    </span>
                    <span className="init-modal-stat-label">{stat.etiqueta}</span>
                  </div>
                ))}
              </div>

              <div className="init-modal-help">
                <h4 className="init-modal-help-title">¿Cómo ayudamos?</h4>
                <ul className="init-modal-help-list">
                  {activeModal.comoAyudamos.map((item, idx) => (
                    <li key={idx} className="init-modal-help-item">
                      <svg width="20" height="20" fill="none" stroke="#5BA88F" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="init-modal-actions">
                <a
                  href="#donar"
                  className="init-modal-btn-primary"
                  style={{ background: activeModal.color }}
                  onClick={closeModal}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Donar a {activeModal.nombre}
                </a>
                <button className="init-modal-btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
