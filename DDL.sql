CREATE DATABASE OthelloIGame;

USE  OthelloIGame;

CREATE TABLE Rol(
id_rol INT PRIMARY KEY,
nombre_rol VARCHAR(255) NOT NULL
);

CREATE TABLE Usuario(
id_usuario INT IDENTITY(1,1) PRIMARY KEY,
rol INT NOT NULL,
pnombre_usuario VARCHAR(255)  NOT NULL ,
snombre_usuario VARCHAR(255) NOT NULL,
apellido_usuario VARCHAR(255) NOT NULL,
nombre_usuario VARCHAR(255) NOT NULL,
palabra_secreta VARCHAR(255) NOT NULL,
fecha_nacimiento DATE NOT NULL,
pais VARCHAR(255) NOT NULL,
correo_electronico VARCHAR(255) NOT NULL,
FOREIGN KEY(rol)REFERENCES Rol(id_rol)
);

CREATE TABLE TipoJuego(
id_tipoJuego INT IDENTITY(1,1) PRIMARY KEY,
descripcion_tipo VARCHAR(255)
);

CREATE TABLE Juego(
id_juego INT IDENTITY(1,1) PRIMARY KEY,
ganador INT,
fecha_creacionjuego DATETIME,
tipo_juego INT,
empate bit,
FOREIGN KEY (tipo_juego) REFERENCES TipoJuego(id_tipoJuego),
FOREIGN KEY (ganador)   REFERENCES Usuario(id_usuario)
);


CREATE TABLE DetalleJuego(
id_detalleJuego INT IDENTITY(1,1) PRIMARY KEY,
Id_juego INT,
jugador1 INT NOT NULL,
jugador2 INT NOT NULL,
perdedor INT,
punteo_jugador1  TINYINT,
punteo_jugador2  TINYINT,
movs_jugador1 TINYINT,
movs_jugador2 TINYINT,
FOREIGN KEY (id_juego) REFERENCES Juego(id_juego),
FOREIGN KEY (jugador1)  REFERENCES Usuario(id_usuario),
FOREIGN KEY (jugador2)  REFERENCES Usuario(id_usuario),
FOREIGN KEY (perdedor)  REFERENCES Usuario(id_usuario),

);

CREATE TABLE Torneo(
id_torneo INT IDENTITY(1,1) PRIMARY KEY,
nombre_torneo VARCHAR(255) NOT NULL,
ganador_torneo INT,
fecha_creacion DATETIME,
FOREIGN KEY(ganador_torneo) REFERENCES Usuario(id_usuario)
);

CREATE TABLE DetalleTorneo(
id_detalleTorneo INT IDENTITY(1,1) PRIMARY KEY,
ronda_torneo TINYINT,
id_juego INT,
id_torneo INT,
FOREIGN KEY (id_torneo) REFERENCES Torneo(id_torneo),
FOREIGN KEY (id_juego) REFERENCES Juego(id_juego)
);