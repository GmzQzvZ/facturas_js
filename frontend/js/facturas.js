let productos = [];

// Cargar productos desde inventario
const cargarProductos = async () => {
  const res = await fetch('/api/inventario');
  productos = await res.json();
  agregarProductoSelect(); // primera fila
};

// Crear una fila de producto
const crearProductoSelect = () => {
  const item = document.createElement('div');
  item.className = 'producto-item';

  const cantidad = document.createElement('input');
  cantidad.type = 'number';
  cantidad.className = 'cantidad';
  cantidad.min = 1;
  cantidad.value = 1;
  cantidad.required = true;

  const select = document.createElement('select');
  select.className = 'producto-select';
  productos.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = `${p.nombre} - $${parseFloat(p.precio).toFixed(2)}`;
    select.appendChild(option);
  });

  const precio = document.createElement('input');
  precio.type = 'number';
  precio.className = 'precio';
  precio.step = '0.01';
  precio.readOnly = true;
  precio.required = true;
  precio.value = productos[0]?.precio || 0;

  const subtotal = document.createElement('span');
  subtotal.className = 'subtotal';
  subtotal.textContent = `$${precio.value}`;

  const eliminarBtn = document.createElement('button');
  eliminarBtn.type = 'button';
  eliminarBtn.className = 'eliminar';
  eliminarBtn.textContent = '🗑';
  eliminarBtn.addEventListener('click', () => {
    item.remove();
    calcularTotal();
  });

  select.addEventListener('change', () => {
    const prod = productos.find(p => p.id == select.value);
    if (prod) precio.value = prod.precio;
    subtotal.textContent = `$${(precio.value * cantidad.value).toFixed(2)}`;
    calcularTotal();
  });

  cantidad.addEventListener('input', () => {
    subtotal.textContent = `$${(precio.value * cantidad.value).toFixed(2)}`;
    calcularTotal();
  });

  item.appendChild(cantidad);
  item.appendChild(select);
  item.appendChild(precio);
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
    producto_id: parseInt(item.querySelector('select').value),
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
    location.reload();
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
