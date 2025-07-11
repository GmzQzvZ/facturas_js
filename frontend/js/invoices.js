const cargarFacturas = async () => {
  const res = await fetch('/api/facturas');
  const facturas = await res.json();

  const tbody = document.getElementById('invoice-table');
  tbody.innerHTML = '';

  facturas.forEach(f => {
    const fila = document.createElement('tr');

    const productos = f.productos.map(p =>
      `${p.descripcion} (x${p.cantidad}) - $${parseFloat(p.precio).toFixed(2)}`
    ).join('<br>');

    fila.innerHTML = `
      <td>${f.cliente}</td>
      <td>${new Date(f.fecha).toLocaleDateString()}</td>
      <td>${productos}</td>
      <td>$${parseFloat(f.total).toFixed(2)}</td>
      <td><button onclick="imprimirFactura(${f.id})">🖨 Imprimir</button></td>
    `;

    tbody.appendChild(fila);
  });
};

const imprimirFactura = async (facturaId) => {
  const res = await fetch('/api/facturas');
  const facturas = await res.json();
  const factura = facturas.find(f => f.id === facturaId);

  if (!factura) return alert('Factura no encontrada');

  const ventana = window.open('', 'PRINT', 'height=600,width=800');
  ventana.document.write(`
    <html>
    <head>
      <title>Factura #${factura.id}</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { text-align: center; }
        .factura { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      </style>
    </head>
    <body>
      <h1>Café Memorias</h1>
      <p><strong>Cliente:</strong> ${factura.cliente}</p>
      <p><strong>Fecha:</strong> ${new Date(factura.fecha).toLocaleDateString()}</p>
      <div class="factura">
        <table>
          <thead>
            <tr><th>Descripción</th><th>Cantidad</th><th>Precio</th></tr>
          </thead>
          <tbody>
            ${factura.productos.map(p => `
              <tr>
                <td>${p.descripcion}</td>
                <td>${p.cantidad}</td>
                <td>$${parseFloat(p.precio).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h3>Total: $${parseFloat(factura.total).toFixed(2)}</h3>
      </div>
    </body>
    </html>
  `);
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();
};

window.addEventListener('DOMContentLoaded', cargarFacturas);
