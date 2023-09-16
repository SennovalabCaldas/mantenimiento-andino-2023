import React from "react";
import "./Footer.scss"; // Estilo CSS para el footer
import { image } from "../../../assets";
const Footer = () => {
  const numeroDeTelefono = "+57310833591"; // Reemplaza esto con el número de teléfono deseado
  const enlaceWhatsApp = `https://wa.me/${numeroDeTelefono}`;
  return (
    <footer className="footer">
      <div className="footer__item">
        <h3>Información de contacto</h3>

        <div className="footer__item-inf">
          <a
            href="mailto:
          mantenimientoandino@mantenimientoandino.co"
          >
            mantenimientoandino@mantenimientoandino.co
          </a>
          <p>
            <strong>Celular:</strong> <br />
          </p>
          <a href="tel:+573103833591">+57 310 383 3591</a>
        </div>
      </div>
      <div className="footer__item">
        <h3>Dirección</h3>

        <a
          href="https://goo.gl/maps/9JvQ1J1Z1Z1Z1Z1Z1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            Cl 76a # 21-85, Milan.
            <br />
            <strong> Manizales, Caldas, Colombia.</strong>
          </p>
          <p>
            <strong>Horario de atención:</strong> <br />
            Lunes a Viernes de 8:00 am a 5:00 pm
          </p>
        </a>
      </div>
      <div className="footer__item">
        <ul>
          <div className="footer__item-icon">
            <div className="footer__item-sennovalab">
              <div className="footer__item-img">
                <a
                  href="http://sennovalab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={image.logoSennovalabNoC} />
                </a>
              </div>
              <a
                href="http://sennovalab.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>© 2023 Copyright SENNOVALAB</h3>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
