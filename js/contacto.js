// HU2: confirmación del formulario de contacto.
// El evento "submit" solo se dispara cuando la validación nativa (required, pattern,
// minlength...) ya pasó, así que aquí no hace falta volver a validar.
const contactoForm = document.querySelector('.contact-form');
const contactoOk = document.getElementById('contacto-ok');

const motivos = {
  consulta: 'tu consulta',
  reclamo: 'tu reclamo',
  sugerencia: 'tu sugerencia',
};

contactoForm.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = contactoForm.elements.nombre.value.trim();
  const email = contactoForm.elements.email.value.trim();
  const motivo = motivos[contactoForm.elements.motivo.value];

  // Se construye con textContent: lo que escribe la persona nunca se interpreta como HTML.
  const tarjeta = document.createElement('div');
  tarjeta.className = 'rounded-(--radius-sm) border border-(--color-accent) bg-(--color-cream) p-4 text-(--color-primary)';
  tarjeta.tabIndex = -1;

  const titulo = document.createElement('p');
  titulo.className = 'font-bold';
  titulo.textContent = `¡Gracias, ${nombre}!`;

  const detalle = document.createElement('p');
  detalle.className = 'text-sm';
  detalle.textContent = `Recibimos ${motivo}. Te responderemos a ${email}. (Demostración: el mensaje no se envía a ningún servidor.)`;

  tarjeta.append(titulo, detalle);
  contactoOk.replaceChildren(tarjeta);

  contactoForm.reset();
  tarjeta.focus();
});
