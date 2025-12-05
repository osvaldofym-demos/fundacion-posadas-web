// app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fundación Posadas | Transformando vidas',
  description: 'Fundación Posadas es el brazo social de Grupo Posadas. Programas de educación, salud y apoyo a damnificados que transforman la vida de miles de familias mexicanas.',
  keywords: ['fundación', 'posadas', 'donación', 'educación', 'salud', 'México', 'becas'],
  openGraph: {
    title: 'Fundación Posadas | Transformando vidas',
    description: 'Programas de educación, salud y apoyo a damnificados.',
    type: 'website',
    locale: 'es_MX',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
