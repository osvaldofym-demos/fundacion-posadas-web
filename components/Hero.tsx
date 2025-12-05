// components/Hero.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FormattedHeroSlide } from '@/types/strapi';

// Datos por defecto si Strapi no está conectado
const defaultSlides: FormattedHeroSlide[] = [
  {
    id: 1,
    titulo: 'Juntos transformamos vidas',
    subtitulo: 'Tu donación hace la diferencia en la educación, salud y bienestar de miles de familias mexicanas.',
    imagen: '/assets/fotos/AdobeStock_622012882.jpeg',
    textoBoton: 'Dona ahora',
  },
  {
    id: 2,
    titulo: 'Educación para el futuro',
    subtitulo: 'Más de 500 becas otorgadas a estudiantes que sueñan con un mejor mañana.',
    imagen: '/assets/fotos/AdobeStock_1299452762.jpeg',
    textoBoton: 'Conoce más',
  },
  {
    id: 3,
    titulo: 'Salud y bienestar',
    subtitulo: 'Programas de salud visual y auditiva que devuelven la sonrisa a miles de niños.',
    imagen: '/assets/fotos/AdobeStock_1534163308.jpeg',
    textoBoton: 'Ver programas',
  },
];

interface HeroProps {
  slides?: FormattedHeroSlide[];
}

export default function Hero({ slides }: HeroProps) {
  const heroSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <Image
            src={slide.imagen}
            alt={slide.titulo}
            fill
            className="hero-img"
            priority={index === 0}
          />
          <div className="hero-overlay" />
        </div>
      ))}

      <div className="hero-content">
        <h1 className="hero-title">{heroSlides[currentSlide].titulo}</h1>
        <p className="hero-sub">{heroSlides[currentSlide].subtitulo}</p>
        <Link href="#donar" className="hero-btn">
          {heroSlides[currentSlide].textoBoton}
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="hero-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
