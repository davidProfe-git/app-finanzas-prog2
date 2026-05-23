-- Base de datos: finanzas
-- App de Gestión de Finanzas
-- Autor: Luisa Fernanda Perdomo Medina

CREATE DATABASE IF NOT EXISTS finanzas;
USE finanzas;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  fecha_nacimiento DATE,
  ciudad VARCHAR(100),
  pais VARCHAR(100),
  foto_perfil VARCHAR(255),
  activo TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla ingresos
CREATE TABLE IF NOT EXISTS ingresos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100),
  fuente VARCHAR(100),
  metodo_pago VARCHAR(50),
  comprobante VARCHAR(100),
  fecha DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla gastos
CREATE TABLE IF NOT EXISTS gastos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100),
  metodo_pago VARCHAR(50),
  proveedor VARCHAR(100),
  comprobante VARCHAR(100),
  es_fijo TINYINT DEFAULT 0,
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
  descripcion VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  saldo_actual DECIMAL(10,2),
  mes INT,
  anio INT,
  fecha DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);