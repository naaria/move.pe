// HU1: calculadora de gasto energético en reposo (ecuación de Mifflin–St Jeor).
// El navegador valida los campos (required, min, max) antes de disparar "submit".
const calcForm = document.getElementById('calc-form');
const calcResultado = document.getElementById('calc-resultado');

function gastoEnReposo({ sexo, edad, peso, talla }) {
  const ajuste = sexo === 'hombre' ? 5 : -161;
  return 10 * peso + 6.25 * talla - 5 * edad + ajuste;
}

calcForm.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const datos = new FormData(calcForm);
  const kcal = gastoEnReposo({
    sexo: datos.get('sexo'),
    edad: Number(datos.get('edad')),
    peso: Number(datos.get('peso')),
    talla: Number(datos.get('talla')),
  });

  // Se redondea a 10 kcal: es una estimación, no un valor exacto.
  const redondeado = Math.round(kcal / 10) * 10;

  calcResultado.innerHTML = `
    <div class="rounded-(--radius) bg-(--color-primary) p-6 text-(--color-on-dark)">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-2)">Gasto en reposo estimado</p>
      <p class="mt-2 text-5xl font-medium tracking-tight">${redondeado.toLocaleString('es-PE')} <span class="text-lg font-normal text-(--color-on-dark-muted)">kcal/día</span></p>
      <p class="mt-3 text-sm text-(--color-on-dark-muted)">Es lo que tu cuerpo usaría en reposo total. Tu gasto real es mayor porque te mueves, y MOVE lo afina con tus registros.</p>
    </div>`;
});
