CREATE DATABASE finanzas;
USE finanzas;

CREATE TABLE usuario(
  usuario VARCHAR(20) NOT NULL PRIMARY KEY,
  clave VARCHAR(30) NOT NULL
);

CREATE TABLE categoria(
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,

  tipo ENUM('Ingreso', 'Gasto')
  DEFAULT 'Gasto'
);

CREATE TABLE movimiento(
  id_movimiento INT AUTO_INCREMENT PRIMARY KEY,

  usuario VARCHAR(20) NOT NULL,
  id_categoria INT NOT NULL,

  valor FLOAT NOT NULL,
  descripcion VARCHAR(255),

  fecha DATE NOT NULL,

  FOREIGN KEY (usuario)
  REFERENCES usuario(usuario),

  FOREIGN KEY (id_categoria)
  REFERENCES categoria(id_categoria)
);


INSERT INTO categoria(nombre, tipo)
VALUES
('Salario', 'Ingreso'),
('Alimentacion', 'Gasto'),
('Transporte', 'Gasto'),
('Freelance', 'Ingreso');

INSERT INTO usuario(usuario, clave)
VALUES
('david', '123456');

INSERT INTO movimiento(
  usuario,
  id_categoria,
  valor,
  descripcion,
  fecha
)
VALUES
('david', 1, 2500000, 'Pago mensual', '2026-05-01'),
('david', 2, 50000, 'Compra almuerzo', '2026-05-02'),
('david', 3, 12000, 'Bus', '2026-05-02');