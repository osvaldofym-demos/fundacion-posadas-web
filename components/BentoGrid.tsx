// components/BentoGrid.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { FormattedStat, FormattedTestimonio } from '@/types/strapi';

// Datos por defecto
const defaultStats: FormattedStat[] = [
  { id: 1, numero: '10,000+', etiqueta: 'Familias beneficiadas' },
  { id: 2, numero: '500+', etiqueta: 'Becas otorgadas' },
  { id: 3, numero: '15', etiqueta: 'Estados de México' },
];

const defaultTestimonio: FormattedTestimonio = {
  id: 1,
  quote: 'Gracias a la beca de Fundación Posadas, pude terminar mi carrera y hoy trabajo ayudando a otros.',
  autor: 'María González',
  año: 'Becaria 2022',
};

interface BentoGridProps {
  stats?: FormattedStat[];
  testimonio?: FormattedTestimonio;
}

export default function BentoGrid({ stats, testimonio }: BentoGridProps) {
  const statsData = stats && stats.length > 0 ? stats : defaultStats;
  const testimonioData = testimonio || defaultTestimonio;
  const statsRef = useRef<HTMLDivElement>(null);

  // Animación de números
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNums = entry.target.querySelectorAll('.stat-num');
            statNums.forEach((el) => {
              const target = parseInt(el.getAttribute('data-target') || '0', 10);
              animateNumber(el as HTMLElement, target);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumber = (el: HTMLElement, target: number) => {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      el.textContent = current.toLocaleString() + (target >= 100 ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  // Extraer números para animación
  const parseNumber = (str: string): number => {
    return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
  };

  return (
    <section id="impacto" className="bento-section">
      <div className="bento-grid">
        {/* Large Card */}
        <div className="bento-large">
          <Image
            src="/assets/fotos/AdobeStock_1299452762.jpeg"
            alt="Niños en programa educativo"
            fill
            className="bento-img"
          />
          <div className="bento-glass">
            <span className="bento-label">Educación</span>
          </div>
          <div className="bento-content">
            <h2 className="bento-title">Transformamos el futuro de México</h2>
            <p className="bento-desc">
              Miles de estudiantes han logrado sus sueños gracias a becas y programas educativos.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bento-stats" ref={statsRef}>
          {statsData.map((stat) => (
            <div key={stat.id} className="stat-card">
              <span
                className="stat-num"
                data-target={parseNumber(stat.numero)}
              >
                0{stat.numero.includes('+') ? '+' : ''}
              </span>
              <span className="stat-label">{stat.etiqueta}</span>
            </div>
          ))}
        </div>

        {/* Medium Cards */}
        <div className="bento-medium">
          <Image
            src="/assets/fotos/AdobeStock_1534163308.jpeg"
            alt="Programa de salud visual"
            fill
            className="bento-img"
          />
          <div className="bento-glass-small">
            <span className="bento-label-small">Salud</span>
          </div>
        </div>

        <div className="bento-medium">
          <Image
            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            alt="Apoyo a damnificados"
            fill
            className="bento-img"
          />
          <div className="bento-glass-small">
            <span className="bento-label-small">Damnificados</span>
          </div>
        </div>

        {/* Quote */}
        <div className="bento-quote">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
          <p className="quote-text">&ldquo;{testimonioData.quote}&rdquo;</p>
          <span className="quote-author">
            — {testimonioData.autor}, {testimonioData.año}
          </span>
        </div>

        {/* Small Images */}
        <div className="bento-small">
          <Image
            src="/assets/fotos/AdobeStock_966012241.jpeg"
            alt="Actividades educativas"
            fill
            className="bento-img"
          />
        </div>

        <div className="bento-small">
          <Image
            src="/assets/fotos/AdobeStock_899688540.jpeg"
            alt="Consulta médica"
            fill
            className="bento-img"
          />
        </div>
      </div>
    </section>
  );
}
