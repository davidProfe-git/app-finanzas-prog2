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