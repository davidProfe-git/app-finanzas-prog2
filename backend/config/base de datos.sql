CREATE DATABASE finanzas;

USE finanzas;


CREATE TABLE categoria(
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  icono VARCHAR(10),
  tipo ENUM('Ingreso','Gasto') DEFAULT 'Gasto'
);


CREATE TABLE movimiento(
  id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
  id_categoria INT NULL,
  valor DECIMAL(12,2) NOT NULL,
  tipo VARCHAR(10) NOT NULL,
  fecha DATE DEFAULT (CURRENT_DATE),
  descripcion VARCHAR(100),

  FOREIGN KEY (id_categoria)
  REFERENCES categoria(id_categoria)
);


INSERT INTO categoria(nombre, icono, tipo)
VALUES
('Comida','🍔','Gasto'),
('Servicios','💡','Gasto'),
('Transporte','🚌','Gasto'),
('Internet','📶','Gasto'),
('Ropa','👕','Gasto');


INSERT INTO movimiento(id_categoria, valor, tipo, descripcion)
VALUES
(1,18000,'Gasto','Almuerzo'),
(3,5200,'Gasto','Bus'),
(NULL,800000,'Ingreso','Salario'),
(2,120000,'Gasto','Pago energia'),
(4,65000,'Gasto','Internet'),
(5,95000,'Gasto','Camiseta');