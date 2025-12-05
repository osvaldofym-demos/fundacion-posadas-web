// components/Header.tsx
import Link from 'next/link';

interface HeaderProps {
  logoBlanco?: string;
  logoColor?: string;
}

export default function Header({ logoBlanco, logoColor }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          <span className="logo-text">FUNDACIÓN</span>
          <span className="logo-text">POSADAS.</span>
        </Link>
        
        <nav className="nav">
          <Link href="#impacto" className="nav-link">Impacto</Link>
          <Link href="#iniciativas" className="nav-link">Iniciativas</Link>
          <Link href="#nosotros" className="nav-link">Nosotros</Link>
        </nav>
        
        <Link href="#donacion" className="donate-btn">
          Dona ahora
        </Link>
      </div>
    </header>
  );
}
