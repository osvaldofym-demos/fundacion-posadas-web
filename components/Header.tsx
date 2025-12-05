// components/Header.tsx
import Link from 'next/link';

interface HeaderProps {
  logoBlanco?: string;
  logoColor?: string;
  textosSitio: any;
}

export default function Header({ logoBlanco, logoColor, textosSitio }: HeaderProps) {
  // Valores por defecto si no hay datos
  const menuImpacto = textosSitio?.menuImpacto || 'Impacto';
  const menuIniciativas = textosSitio?.menuIniciativas || 'Iniciativas';
  const menuNosotros = textosSitio?.menuNosotros || 'Nosotros';
  const botonDonacion = textosSitio?.botonDonacion || 'Dona ahora';

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          <span className="logo-text">FUNDACIÓN</span>
          <span className="logo-text">POSADAS.</span>
        </Link>
        
        <nav className="nav">
          <Link href="#impacto" className="nav-link">{menuImpacto}</Link>
          <Link href="#iniciativas" className="nav-link">{menuIniciativas}</Link>
          <Link href="#nosotros" className="nav-link">{menuNosotros}</Link>
        </nav>
        
        <Link href="#donacion" className="donate-btn">
          {botonDonacion}
        </Link>
      </div>
    </header>
  );
}
