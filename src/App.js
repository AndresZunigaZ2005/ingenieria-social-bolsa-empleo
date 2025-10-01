import React, { useState } from 'react';
import './App.css';
import logoUniquindio from "./images/logo-uniquindio-editado.jpg";

export default function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    carrera: '',
    semestre: '',
    edad: ''
  });

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.carrera || !formData.semestre || !formData.edad) {
      alert('Por favor completa todos los campos del formulario');
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
        edad: ''
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

          <button type="submit">Enviar formulario</button>
        </form>
      </div>

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
        <p>Universidad del Quindío - Bolsa de Empleo</p>
        <p>© 2025 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}