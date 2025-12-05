// components/Footer.tsx
interface FooterProps {
  configuracion: any;
  textosSitio: any;
}

export default function Footer({ configuracion, textosSitio }: FooterProps) {
  const footerDescripcion = textosSitio?.footerDescripcion || 'Transformando vidas a través de la educación, salud y desarrollo comunitario en México.';
  const footerContactoTitulo = textosSitio?.footerContactoTitulo || 'Contacto';
  const footerEnlacesTitulo = textosSitio?.footerEnlacesTitulo || 'Enlaces útiles';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">FUNDACIÓN POSADAS</h3>
          <p className="footer-desc">{footerDescripcion}</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">{footerContactoTitulo}</h4>
          <p className="footer-text">{configuracion?.telefono}</p>
          <p className="footer-text">{configuracion?.email}</p>
          <p className="footer-text">{configuracion?.direccion}</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">{footerEnlacesTitulo}</h4>
          <ul className="footer-links">
            <li><a href="#impacto">Nuestro impacto</a></li>
            <li><a href="#iniciativas">Programas</a></li>
            <li><a href="#donacion">Donar</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
