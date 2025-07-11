# 💼 Sistema de Facturación y Gestión de Inventario

Este proyecto es una plataforma básica para gestionar facturación, inventario, autenticación de usuarios y ahora, **registro de gastos**. Está construida con:

- Node.js + Express
- MySQL
- HTML/CSS/JS vanilla

## 📦 Módulos principales

- 🔐 Login y registro de usuarios
- 📋 Gestión de inventario (crear, editar, eliminar productos)
- 🧾 Registro y visualización de facturas
- 📊 Registro de gastos monetarios

---

## 🧾 Facturación

Permite registrar facturas con múltiples productos, calcular totales y guardar detalles en la base de datos.

### Base de datos:

```sql
CREATE TABLE facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(100),
  fecha DATE,
  total DECIMAL(10,2)
);

CREATE TABLE detalle_factura (
  id INT AUTO_INCREMENT PRIMARY KEY,
  factura_id INT,
  producto_id INT,
  cantidad INT,
  precio DECIMAL(10,2),
  FOREIGN KEY (factura_id) REFERENCES facturas(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
```

---

## 📦 Inventario

Permite registrar productos con:

- Nombre
- Descripción
- Cantidad
- Precio

Soporta edición y eliminación.

```sql
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  cantidad INT,
  precio DECIMAL(10,2)
);
```

---

## 🛠 Usuarios

- Registro de nuevos usuarios con nombre, email y contraseña (encriptada con bcrypt).
- Inicio de sesión básico con verificación.

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

---

## 💸 Nuevo módulo: Gastos de Dinero

Permite registrar salidas de efectivo, con información detallada.

### 📥 Campos:

- Descripción (obligatorio)
- Monto (obligatorio)
- Fecha (obligatorio)
- Categoría (opcional)
- Observaciones (opcional)

### 📚 Base de datos:

```sql
CREATE TABLE gastos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha DATE NOT NULL,
  categoria VARCHAR(100),
  observaciones TEXT
);
```

## 🚀 Instrucciones de uso

1. Clona el repositorio:
   ```
   git clone https://github.com/GmzQzvZ/facturas_js.git
   ```

2. Instala dependencias:
   ```
   cd backend
   npm install
   ```

3. Crea el archivo `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=tu_clave
   DB_NAME=facturacion
   PORT=3000
   ```

4. Ejecuta el servidor:
   ```
   node backend/server.js
   ```

---


## 🧑‍💻 Autor

Sebastián Gómez Q.  
[GitHub](https://github.com/GmzQzvZ)
Estudiante de Ingeniería en Software de la Universidad Iberomaericana