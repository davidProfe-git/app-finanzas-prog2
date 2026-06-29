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
    monto INT NOT NULL,
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

INSERT INTO categorias (nombre_categoria, tipo_categoria, descripcion) VALUES
('Arriendo', 'gasto', 'Pago mensual del arriendo'),
('Entretenimiento', 'gasto', 'Diversion y Ocio'),
('Tecnología', 'gasto', 'Gastos en dispositivos y software'),
('Ganancia ocasional', 'ingreso', 'Ganancias por juegos de azar o loterías'),
('Honorarios profesionales', 'ingreso', 'Servicios profesionales prestados'),
('Bonos y Aguinaldos', 'ingreso', 'Bonos y primas pagadas');

SELECT c.tipo_categoria, c.nombre_categoria, m.monto, m.fecha FROM movimientos m
INNER JOIN categorias c ON m.categoria_id = c.categoria_id;

SELECT * FROM categorias ORDER BY tipo_categoria, nombre_categoria;

SELECT * FROM movimientos;