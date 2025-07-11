// frontend/js/inventario.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-producto');
  const tabla = document.querySelector('#tabla-inventario tbody');

  const cargarProductos = async () => {
    const res = await fetch('/api/inventario');
    const productos = await res.json();

    tabla.innerHTML = '';
    productos.forEach(p => {
      const nombre = p.nombre.replace(/'/g, "\'");
      const descripcion = (p.descripcion || '').replace(/'/g, "\'");
      tabla.innerHTML += `
        <tr>
          <td>${nombre}</td>
          <td>${descripcion}</td>
          <td>${p.cantidad}</td>
          <td>$${parseFloat(p.precio).toFixed(2)}</td>
          <td>
            <button class="btn-editar" onclick="editarProducto(${p.id}, '${nombre}', '${descripcion}', ${p.cantidad}, ${p.precio})">Editar</button>
            <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = {
      nombre: document.getElementById('nombre').value,
      descripcion: document.getElementById('descripcion').value,
      cantidad: parseInt(document.getElementById('cantidad').value),
      precio: parseFloat(document.getElementById('precio').value)
    };

    const editId = form.dataset.editando;

    const res = await fetch(editId ? `/api/inventario/${editId}` : '/api/inventario', {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });

    const result = await res.json();
    if (res.ok) {
      form.reset();
      form.dataset.editando = '';
      form.querySelector('button').textContent = 'Agregar Producto';
      form.querySelector('button').className = 'btn-agregar';
      cargarProductos();
    } else {
      alert(result.error);
    }
  });

  window.eliminarProducto = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    const res = await fetch(`/api/inventario/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (res.ok) cargarProductos();
    else alert(result.error);
  };

  window.editarProducto = (id, nombre, descripcion, cantidad, precio) => {
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('cantidad').value = cantidad;
    document.getElementById('precio').value = precio;

    form.dataset.editando = id;
    form.querySelector('button').textContent = 'Actualizar Producto';
    form.querySelector('button').className = 'btn-agregar';
  };

  cargarProductos();
});


