# 📦 Sistema de Facturación y Gestión de Inventario

Este proyecto es una aplicación web de facturación que permite registrar usuarios, iniciar sesión, crear facturas con productos seleccionados desde un inventario y visualizar el historial de facturas. Toda la información se almacena en una base de datos MySQL y el frontend es totalmente personalizado.

## 🚀 Características

- ✅ Registro e inicio de sesión de usuarios con contraseña encriptada.
- 🧾 Registro de facturas con productos seleccionados desde un inventario.
- 📦 Gestión de productos: nombre, descripción, cantidad, precio.
- 💰 Cálculo automático de totales.
- 🧮 Detalles por factura con desglose de productos.
- 📋 Historial de facturas.
- 🔐 Autenticación simple (sin JWT).
- 📄 Opción de impresión de factura (pendiente/mejorable).

## 📁 Estructura del Proyecto

```
facturas_js/
├── backend/
│   ├── db.js
│   ├── server.js
│   └── routes/
│       ├── auth.js
│       ├── facturas.js
│       └── inventario.js
├── frontend/
│   ├── css/
│   │   └── *.css
│   ├── js/
│   │   ├── factura.js
│   │   ├── invoices.js
│   │   └── login.js
│   ├── factura.html
│   ├── invoices.html
│   ├── login.html
│   └── home.html
├── .env
├── package.json
└── README.md
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/facturas_js.git
cd facturas_js
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

```dotenv
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=facturacion
PORT=3000
```

### 4. Ejecutar servidor

```bash
node backend/server.js
```

## 🗃️ Base de Datos

Asegúrate de crear una base de datos con las siguientes tablas:

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  cantidad INT,
  precio DECIMAL(10,2)
);

CREATE TABLE facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(100),
  fecha DATE,
  total DECIMAL(10,2)
);

CREATE TABLE detalle_factura (
  id INT AUTO_INCREMENT PRIMARY KEY,
  factura_id INT,
  descripcion TEXT,
  cantidad INT,
  precio DECIMAL(10,2),
  FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE CASCADE
);
```

## 🛠 Tecnologías Usadas

- **Node.js**
- **Express**
- **MySQL / mysql2**
- **HTML5, CSS3, JavaScript**
- **bcryptjs**
- **dotenv**
- **Fetch API (Frontend)**

## 📌 Pendientes o Mejoras Futuras

- Autenticación con JWT.
- Control de sesiones.
- Impresión directa de factura.
- Roles de usuario (admin/empleado).
- Filtros por fecha o cliente en facturas.
- Soporte para múltiples productos con stock dinámico.

## 👨‍💻 Autor

Desarrollado por **Sebastián Gómez**  
Estudiante de Ingeniería de Software  
Corporación Universitaria Iberoamericana

## 📬 Contacto

Si tienes dudas o sugerencias, puedes escribirme por GitHub o a mi correo personal.