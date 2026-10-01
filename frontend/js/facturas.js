let productos = [];

// Cargar productos eliminado ya que ahora es texto libre
const cargarProductos = async () => {
  agregarProductoSelect(); // primera fila
};

// Crear una fila de producto
const crearProductoSelect = () => {
  const item = document.createElement('div');
  item.className = 'producto-item';

  const tipo = document.createElement('input');
  tipo.type = 'text';
  tipo.className = 'tipo-input';
  tipo.placeholder = 'Prenda';
  tipo.required = true;

  const cantidad = document.createElement('input');
  cantidad.type = 'number';
  cantidad.className = 'cantidad';
  cantidad.min = 1;
  cantidad.value = 1;
  cantidad.required = true;

  const descripcion = document.createElement('input');
  descripcion.type = 'text';
  descripcion.className = 'descripcion';
  descripcion.placeholder = 'Detalles...';

  const valorUnitario = document.createElement('input');
  valorUnitario.type = 'number';
  valorUnitario.className = 'precio';
  valorUnitario.step = '0.01';
  valorUnitario.placeholder = '0.00';
  valorUnitario.required = true;

  const subtotal = document.createElement('span');
  subtotal.className = 'subtotal';
  subtotal.textContent = '$0.00';

  const eliminarBtn = document.createElement('button');
  eliminarBtn.type = 'button';
  eliminarBtn.className = 'eliminar';
  eliminarBtn.textContent = '🗑';
  eliminarBtn.addEventListener('click', () => {
    item.remove();
    calcularTotal();
  });

  const actualizarSubtotal = () => {
    const val = parseFloat(valorUnitario.value) || 0;
    const cant = parseInt(cantidad.value) || 0;
    subtotal.textContent = `$${(val * cant).toFixed(2)}`;
    calcularTotal();
  };

  cantidad.addEventListener('input', actualizarSubtotal);
  valorUnitario.addEventListener('input', actualizarSubtotal);

  item.appendChild(tipo);
  item.appendChild(cantidad);
  item.appendChild(descripcion);
  item.appendChild(valorUnitario);
  item.appendChild(subtotal);
  item.appendChild(eliminarBtn);
  document.getElementById('productos-container').appendChild(item);
};

// Agregar nuevo producto
const agregarProductoSelect = () => {
  crearProductoSelect();
};

// Calcular total
const calcularTotal = () => {
  const items = document.querySelectorAll('.producto-item');
  let total = 0;
  items.forEach(item => {
    const cantidad = parseFloat(item.querySelector('.cantidad').value) || 0;
    const precio = parseFloat(item.querySelector('.precio').value) || 0;
    total += cantidad * precio;
  });
  document.getElementById('total-factura').textContent = `$${total.toFixed(2)}`;
};

// Guardar factura
const registrarFactura = async (e) => {
  e.preventDefault();

  const cliente = document.getElementById('cliente').value;
  const fecha = document.getElementById('fecha').value;

  const detalles = Array.from(document.querySelectorAll('.producto-item')).map(item => ({
    tipo: item.querySelector('.tipo-input').value,
    descripcion: item.querySelector('.descripcion').value,
    cantidad: parseInt(item.querySelector('.cantidad').value),
    precio: parseFloat(item.querySelector('.precio').value)
  }));

  if (detalles.length === 0) {
    alert("Agrega al menos un producto.");
    return;
  }

  const total = detalles.reduce((sum, d) => sum + d.cantidad * d.precio, 0);

  const res = await fetch('/api/facturas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cliente, fecha, total, detalles })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Factura registrada correctamente');
    window.location.href = '/invoices.html';
  } else {
    alert(data.error || 'Error al registrar la factura');
  }
};

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('agregar-producto').addEventListener('click', agregarProductoSelect);
  document.getElementById('factura-form').addEventListener('submit', registrarFactura);
  cargarProductos();
});
