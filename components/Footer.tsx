// components/Footer.tsx
import Image from 'next/image';

const marcas = [
  { src: '/assets/marcas/liveaqua.svg', alt: 'Live Aqua' },
  { src: '/assets/marcas/grand.svg', alt: 'Grand Fiesta Americana' },
  { src: '/assets/marcas/curamoria.svg', alt: 'Curamoria' },
  { src: '/assets/marcas/fa.svg', alt: 'Fiesta Americana' },
  { src: '/assets/marcas/explorean.svg', alt: 'Explorean' },
  { src: '/assets/marcas/logofi.svg', alt: 'Fiesta Inn' },
  { src: '/assets/marcas/gamma-logo.svg', alt: 'Gamma Hoteles' },
  { src: '/assets/marcas/one-hoteles.svg', alt: 'One Hoteles' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brands">
        {marcas.map((marca) => (
          <Image
            key={marca.alt}
            src={marca.src}
            alt={marca.alt}
            width={140}
            height={40}
            className="footer-brand-logo"
          />
        ))}
      </div>

      <p className="footer-copy">
        Grupo Posadas todos los derechos reservados.
      </p>
    </footer>
  );
}
