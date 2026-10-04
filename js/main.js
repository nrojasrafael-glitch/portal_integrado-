/**
 * Restauradores de la Memoria - Script Principal (main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de funciones
  initFormularioContacto();
  initFiltrosGaleria();
});

/**
 * Validación y almacenamiento del Formulario de Contacto
 */
function initFormularioContacto() {
  const formContacto = document.getElementById('form-contacto');
  if (!formContacto) return;

  formContacto.addEventListener('submit', function (event) {
    event.preventDefault();
    let esValido = true;

    // Campos del formulario
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const selectTipoAporte = document.getElementById('tipo-aporte');
    const inputMensaje = document.getElementById('mensaje');

    // Elementos de error
    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorTipoAporte = document.getElementById('error-tipo-aporte');
    const errorMensaje = document.getElementById('error-mensaje');

    // Limpiar errores previos
    if (errorNombre) errorNombre.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (errorTipoAporte) errorTipoAporte.textContent = '';
    if (errorMensaje) errorMensaje.textContent = '';

    // Validar Nombre
    if (!inputNombre || inputNombre.value.trim() === '') {
      if (errorNombre) errorNombre.textContent = 'Por favor, ingresa tu nombre completo.';
      esValido = false;
    }

    // Validar Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail || !regexEmail.test(inputEmail.value.trim())) {
      if (errorEmail) errorEmail.textContent = 'Por favor, ingresa un correo electrónico válido.';
      esValido = false;
    }

    // Validar Tipo de Aporte
    if (selectTipoAporte && selectTipoAporte.value === '') {
      if (errorTipoAporte) errorTipoAporte.textContent = 'Selecciona una opción de participación.';
      esValido = false;
    }

    // Validar Mensaje
    if (!inputMensaje || inputMensaje.value.trim().length < 10) {
      if (errorMensaje) errorMensaje.textContent = 'El mensaje debe contener al menos 10 caracteres.';
      esValido = false;
    }

    // Procesar registro exitoso
    if (esValido) {
      const datosFormulario = {
        nombre: inputNombre.value.trim(),
        email: inputEmail.value.trim(),
        tipoAporte: selectTipoAporte ? selectTipoAporte.value : 'General',
        mensaje: inputMensaje.value.trim(),
        fecha: new Date().toISOString()
      };

      guardarRegistroLocal(datosFormulario);

      alert('¡Registro enviado con éxito! Gracias por aportar a la memoria histórica del Colegio Tom Adams IED.');
      formContacto.reset();
    }
  });
}

/**
 * Guarda los envíos en LocalStorage para simular base de datos
 */
function guardarRegistroLocal(datos) {
  let registros = JSON.parse(localStorage.getItem('registrosMemoria')) || [];
  registros.push(datos);
  localStorage.setItem('registrosMemoria', JSON.stringify(registros));
}

/**
 * Filtrado dinámico de la Galería Multimedia
 */
function initFiltrosGaleria() {
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const elementosGaleria = document.querySelectorAll('.galeria-item');

  if (botonesFiltro.length === 0 || elementosGaleria.length === 0) return;

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
      // Actualizar estado activo en botones
      botonesFiltro.forEach(b => {
        b.classList.remove('active', 'bg-museum-earth', 'text-white');
        b.classList.add('text-museum-earth');
      });

      const btnActual = e.currentTarget;
      btnActual.classList.add('active', 'bg-museum-earth', 'text-white');
      btnActual.classList.remove('text-museum-earth');

      const categoria = btnActual.getAttribute('data-categoria');

      // Filtrar elementos de la galería
      elementosGaleria.forEach(item => {
        const categoriaItem = item.getAttribute('data-categoria');
        if (categoria === 'todos' || categoriaItem === categoria) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}