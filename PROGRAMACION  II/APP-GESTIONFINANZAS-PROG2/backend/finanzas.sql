-- Base de datos: finanzas
-- App de Gestión de Finanzas
-- Autor: Luisa Fernanda Perdomo Medina

CREATE DATABASE IF NOT EXISTS finanzas;
USE finanzas;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  telefono VARCHAR(20),
  fecha_nacimiento DATE,
  activo TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla ingresos
CREATE TABLE IF NOT EXISTS ingresos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(50),
  metodo_pago VARCHAR(50),
  fecha DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla gastos
CREATE TABLE IF NOT EXISTS gastos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(50),
  metodo_pago VARCHAR(50),
  proveedor VARCHAR(50),
  fecha DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla registro
CREATE TABLE IF NOT EXISTS registro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo ENUM('ingreso','gasto') NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  saldo_actual DECIMAL(10,2),
  fecha DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);