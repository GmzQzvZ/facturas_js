CREATE DATABASE IF NOT EXISTS facturacion;

USE facturacion;

CREATE TABLE facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(100),
  fecha DATE,
  total DECIMAL(10,2)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  cantidad INT,
  precio DECIMAL(10,2)
);

CREATE TABLE detalle_factura (
  id INT AUTO_INCREMENT PRIMARY KEY,
  factura_id INT,
  tipo VARCHAR(100),
  descripcion TEXT,
  cantidad INT,
  precio DECIMAL(10,2),
  FOREIGN KEY (factura_id) REFERENCES facturas(id)
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE gastos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha DATE NOT NULL,
  categoria VARCHAR(100),
  observaciones TEXT
);