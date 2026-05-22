CREATE DATABASE finanzas;

USE finanzas;

CREATE TABLE usuario(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(20) NOT NULL,
    contraseña VARCHAR(20) NOT NULL
);

CREATE TABLE movimiento(
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(50),
    valor FLOAT,
    tipo VARCHAR(20),
    fecha DATE,
    id_usuario INT,

    FOREIGN KEY(id_usuario)
    REFERENCES usuario(id_usuario)
);