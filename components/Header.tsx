// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  logoBlanco?: string;
  logoColor?: string;
}

export default function Header({ logoBlanco, logoColor }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whiteLogo = logoBlanco || '/assets/logos/LOGO_FUNDACION_Bco-01.png';
  const colorLogo = logoColor || '/assets/logos/LOGO_FUNDACION_color.png';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="logo">
          <Image
            src={whiteLogo}
            alt="Fundación Posadas"
            width={160}
            height={48}
            className={`logo-img logo-white ${scrolled ? 'hidden' : ''}`}
            priority
          />
          <Image
            src={colorLogo}
            alt="Fundación Posadas"
            width={160}
            height={48}
            className={`logo-img logo-color ${scrolled ? '' : 'hidden'}`}
            priority
          />
        </Link>

        <nav className="nav">
          <Link href="#impacto" className="nav-link">Impacto</Link>
          <Link href="#iniciativas" className="nav-link">Iniciativas</Link>
          <Link href="#nosotros" className="nav-link">Nosotros</Link>
          <Link href="#donar" className="btn-donate">Dona ahora</Link>
        </nav>
      </div>
    </header>
  );
}
