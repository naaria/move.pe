// Marca el plan que viene en la URL (compra.html?plan=pro) y actualiza el resumen.
const planes = {
  free: {
    nombre: 'Free',
    precio: 'S/ 0',
    periodo: 'para siempre',
    incluye: ['Registro de comidas y actividad', 'Rutinas de fuerza', '30 días de historial'],
  },
  plus: {
    nombre: 'Plus',
    precio: 'S/ 15',
    periodo: 'al mes',
    incluye: ['Todo lo del Free', 'Historial ilimitado', 'Escáner de códigos de barras'],
  },
  pro: {
    nombre: 'Pro',
    precio: 'S/ 25',
    periodo: 'al mes',
    incluye: ['Todo lo del Plus', 'Objetivos que se ajustan a tus datos', 'Análisis de progreso y récords', 'Exportar tus datos'],
  },
  equipos: {
    nombre: 'Equipos',
    precio: 'S/ 99',
    periodo: 'al mes',
    incluye: ['Todo lo del Pro', 'Hasta 20 personas', 'Panel para coaches y gimnasios', 'Soporte dedicado'],
  },
};

const radios = document.querySelectorAll('input[name="plan"]');

function mostrarPlan(clave) {
  const plan = planes[clave];
  document.getElementById('resumen-nombre').textContent = plan.nombre;
  document.getElementById('resumen-precio').textContent = plan.precio;
  document.getElementById('resumen-periodo').textContent = plan.periodo;

  const lista = document.getElementById('resumen-lista');
  lista.replaceChildren(...plan.incluye.map((texto) => {
    const li = document.createElement('li');
    li.textContent = texto;
    return li;
  }));

  const mensaje = encodeURIComponent(`Hola, quiero el plan ${plan.nombre} de MOVE`);
  document.getElementById('resumen-wa').href = `https://wa.me/51999999999?text=${mensaje}`;
}

const desdeUrl = new URLSearchParams(window.location.search).get('plan');
if (planes[desdeUrl]) {
  document.querySelector(`input[name="plan"][value="${desdeUrl}"]`).checked = true;
  mostrarPlan(desdeUrl);
}

radios.forEach((radio) => {
  radio.addEventListener('change', () => mostrarPlan(radio.value));
});

// Validación con el estilo de Bootstrap: usa la API nativa (checkValidity) y
// la clase .was-validated para mostrar los mensajes .invalid-feedback.
const formulario = document.querySelector('.compra-form');
const aviso = document.getElementById('compra-ok');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  formulario.classList.add('was-validated');

  if (!formulario.checkValidity()) {
    formulario.querySelector(':invalid').focus();
    return;
  }

  const plan = planes[formulario.elements.plan.value];
  const nombre = formulario.elements.nombre.value.trim();
  aviso.textContent = `¡Listo, ${nombre}! Reservamos tu plan ${plan.nombre}. Te enviaremos el enlace de pago a tu correo. (Demostración: no se realiza ningún cobro.)`;
  aviso.classList.remove('d-none');
  aviso.focus();
});
