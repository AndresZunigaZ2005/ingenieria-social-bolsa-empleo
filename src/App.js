import React, { useState } from 'react';
import './App.css';
import logoUniquindio from "./images/logo-uniquindio-editado.jpg";

export default function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    carrera: '',
    semestre: '',
    edad: '',
    aceptaTerminos: false
  });

  const [showModal, setShowModal] = useState(false);

  const carreras = [
    'Seleccione una carrera',
    'Ingeniería de Sistemas',
    'Ingeniería Civil',
    'Administración de Negocios',
    'Contaduría Pública',
    'Derecho',
    'Medicina',
    'Enfermería',
    'Psicología',
    'Arquitectura',
    'Diseño Industrial'
  ];

  const bannerImageURL = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200"; 
  // Cambia este link por el que quieras usar en el banner

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.carrera || !formData.semestre || !formData.edad || !formData.aceptaTerminos) {
      alert('Por favor completa todos los campos del formulario y acepta los términos y condiciones');
      return;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwzzqbq95O3TakW2tazp7ecmDclkLuO8hyWlzC5m5x88J_RxWqcwmE7zpZ-77xkcHz75Q/exec';
    
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      alert('¡Formulario enviado exitosamente! Tus datos han sido registrados.');
      setFormData({
        nombre: '',
        correo: '',
        carrera: '',
        semestre: '',
        edad: '',
        aceptaTerminos: false
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
    }
  };

  return (
    <div>
      {/* Banner como fondo */}
      <div className="banner-container">
        <div 
          className="banner" 
          style={{ backgroundImage: `url(${bannerImageURL})` }}
        />

        {/* Header superpuesto */}
        <header>
          <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
            <div className="logo">
              <img 
                src={logoUniquindio} 
                alt="Logo Universidad del Quindío" 
                style={{ width: "500px" }}
              />
            </div>

            <nav>
              <button>YO SOY</button>
              <button>MENÚ</button>
              <button>CAMPUS VIRTUAL</button>
            </nav>
          </div>
        </header>

        <div className="texto">
          <h1>BOLSA DE <span>EMPLEO</span></h1>
          <p>Conoce todas las ofertas que tenemos para ti</p>
        </div>
      </div>

      {/* Links */}
      <div className="nav-links">
        <a href="#">Reglamento</a>
        <a href="#">Proyecto de viabilidad</a>
        <a href="#">Resolución 0210</a>
        <a href="#">Manual de Usuario</a>
        <a href="#">más »</a>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <span>Filtrar por</span>
        <button>Empresa</button>
        <button>Ciudad</button>
        <button>Profesión</button>
        <button>Fecha publicación</button>
        <button>Tipo contrato</button>
        <button>Salario</button>
        <input type="text" placeholder="Buscar" />
      </div>

      {/* Formulario de interés */}
      <div className="formulario">
        <h2>Formulario de Interés</h2>
        <p>Completa tus datos para conocer más ofertas para ti</p>

        <form onSubmit={handleSubmit}>
          <label>Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ingresa tu nombre completo"
          />

          <label>Correo electrónico *</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            placeholder="ejemplo@correo.com"
          />

          <label>Carrera *</label>
          <select
            name="carrera"
            value={formData.carrera}
            onChange={handleInputChange}
          >
            {carreras.map((carrera, index) => (
              <option key={index} value={index === 0 ? '' : carrera}>
                {carrera}
              </option>
            ))}
          </select>

          <label>Semestre *</label>
          <input
            type="number"
            name="semestre"
            value={formData.semestre}
            onChange={handleInputChange}
            placeholder="1-12"
            min="1"
            max="12"
          />

          <label>Edad *</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            placeholder="Tu edad"
            min="16"
            max="100"
          />

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleInputChange}
              />
              Acepta los{' '}
              <span
                className="terms-link"
                onClick={() => setShowModal(true)}
              >
                términos y condiciones
              </span>
              {' '}*
            </label>
          </div>

          <button type="submit">Enviar formulario</button>
        </form>
      </div>

      {/* Modal de términos y condiciones */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Términos y Condiciones</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <h3>1. Aceptación de los términos</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <h3>2. Uso de la información</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <h3>3. Privacidad de datos</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <h3>4. Veracidad de la información</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <h3>5. Responsabilidades</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <h3>6. Modificaciones</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <h3>7. Contacto</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      )}

      {/* Ofertas de empleo */}
      <div className="ofertas">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="oferta">
            <h3>Oferta de Empleo {item}</h3>
            <p>Empresa ejemplo • Ciudad</p>
            <p>Descripción breve de la oferta de trabajo disponible...</p>
            <button>Ver detalles</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <div className="university-info">
              <div className="logo-footer">
                <img 
                  src={logoUniquindio} 
                  alt="Logo Universidad del Quindío" 
                  className="footer-logo"
                />
                <div className="accreditation">
                  <span>ALTA CALIDAD</span>
                  <span>RESOLUCIÓN 01026 DEL MEN 2018</span>
                </div>
              </div>
              <p><strong>Vigilada Mineducación</strong></p>
            </div>
          </div>

          <div className="footer-section">
            <div className="contact-info">
              <h4>Universidad del Quindío</h4>
              <p>Carrera 15 con calle 12 norte</p>
              <p>Armenia, Quindío, Colombia</p>
              <p><strong>Horario de atención:</strong> Lunes a viernes de 8:00a.m a 12:00m 2:00p.m a 6:00p.m.</p>
              <p><strong>Teléfono:</strong> +57(606)7359300</p>
              <p><strong>Línea Gratuita Nacional:</strong> 018000963578</p>
              
              <div className="services">
                <p><strong>Centro de Servicios Universitarios CSU</strong></p>
                <p>contactenos@uniquindio.edu.co</p>
                <p><strong>Directorio administrativo</strong></p>
                <p><strong>Formulario electrónico para denuncias</strong></p>
                <p><strong>Protocolo de protección denunciantes anónimos</strong></p>
                <p><strong>Línea anticorrupción:</strong> +57(606)7359416</p>
                <p>corrupcioncero@uniquindio.edu.co</p>
                <p><strong>PQRSDF</strong> 018000963578 Opción3</p>
                <p><strong>Notificaciones Judiciales</strong></p>
                <p>notificaciones@uniquindio.edu.co</p>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <div className="links-section">
              <h4>Enlaces de interés</h4>
              <ul>
                <li><a href="#">Mapa del sitio</a></li>
                <li><a href="#">Ayúdanos a mejorar</a></li>
                <li><a href="#">Políticas de privacidad y condiciones de uso</a></li>
                <li><a href="#">Política de tratamiento de datos personales</a></li>
                <li><a href="#">Políticas de derechos de autor</a></li>
                <li><a href="#">Notificaciones por aviso y judiciales</a></li>
                <li><a href="#">¿Cómo navegar en nuestro sitio web?</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
                <li><a href="#">Glosario</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-section">
            <div className="certifications">
              <h5>Redes Sociales</h5>
              <div className="social-media">
                <div className="social-icons">
                  <a href="#" aria-label="Instagram">📷</a>
                  <a href="#" aria-label="Facebook">📘</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="YouTube">📺</a>
                  <a href="#" aria-label="TikTok">🎵</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}