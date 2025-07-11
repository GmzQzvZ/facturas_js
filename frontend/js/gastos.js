document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-gasto');
  const lista = document.getElementById('lista-gastos');

  const cargarGastos = async () => {
    const res = await fetch('/api/gastos');
    const gastos = await res.json();

    lista.innerHTML = '';
    gastos.forEach(g => {
      lista.innerHTML += `
        <li>
          <strong>${g.descripcion}</strong> - $${parseFloat(g.monto).toFixed(2)} el ${g.fecha}
          ${g.categoria ? `<em>(${g.categoria})</em>` : ''}
          ${g.observaciones ? `<p>${g.observaciones}</p>` : ''}
        </li>
      `;
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      descripcion: document.getElementById('descripcion').value,
      monto: parseFloat(document.getElementById('monto').value),
      fecha: document.getElementById('fecha').value,
      categoria: document.getElementById('categoria').value,
      observaciones: document.getElementById('observaciones').value
    };

    const res = await fetch('/api/gastos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      form.reset();
      cargarGastos();
    } else {
      const error = await res.json();
      alert(error.error || 'Error al registrar gasto');
    }
  });

  cargarGastos();
});
