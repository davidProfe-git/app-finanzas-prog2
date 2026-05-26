CREATE DATABASE finanzas

CREATE TABLE usuario(
  usuario VARCHAR(20) NOT NULL PRIMARY KEY,
  clave VARCHAR(30) NOT NULL

)

CREATE TABLE movimiento(
  id_movimiento INT AUTO_INCREMENT,
  valor FLOAT,
  categoria varchar(50) --FK otra tabla
  tipo 

)

CREATE TABLE movimiento(
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(50),
    valor FLOAT,
    tipo VARCHAR(20),
    fecha DATE,
    id_usuario INT,

    FOREIGN KEY(id_usuario)
    REFERENCES usuario(id_usuario)
)