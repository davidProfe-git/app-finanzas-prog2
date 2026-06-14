CREATE DATABASE FinanzasApp;
USE FinanzasApp;

CREATE TABLE usuarios(
    usuario_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE categorias(
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(50) NOT NULL,
    tipo_categoria ENUM('ingreso', 'gasto') NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE movimientos(
    movimiento_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
);

-- Usuarios
INSERT INTO usuarios (usuario, contraseña) VALUES
('miguel_torres', 'hash_pass_001'),
('laura_gomez', 'hash_pass_002');

-- Categorías
INSERT INTO categorias (nombre_categoria, tipo_categoria, descripcion) VALUES
('Salario', 'ingreso', 'Pago mensual del trabajo'),
('Freelance', 'ingreso', 'Trabajos independientes'),
('Inversiones', 'ingreso', 'Rendimientos y dividendos'),
('Comida', 'gasto', 'Supermercado y restaurantes'),
('Transporte', 'gasto', 'Gasolina y transporte público'),
('Servicios', 'gasto', 'Luz, agua, internet');

-- Movimientos (3 ingresos, 3 gastos)
INSERT INTO movimientos (usuario_id, categoria_id, monto, fecha) VALUES
(1, 1, 3500000.00, '2026-06-01'),  -- ingreso: Salario
(1, 2, 800000.00,  '2026-06-05'),  -- ingreso: Freelance
(2, 3, 250000.00,  '2026-06-08'),  -- ingreso: Inversiones
(1, 4, 420000.00,  '2026-06-03'),  -- gasto: Comida
(2, 5, 150000.00,  '2026-06-06'),  -- gasto: Transporte
(1, 6, 320000.00,  '2026-06-10'); -- gasto: Servicios

SELECT c.tipo_categoria, c.nombre_categoria, m.monto, m.fecha FROM movimientos m
INNER JOIN categorias c ON m.categoria_id = c.categoria_id;