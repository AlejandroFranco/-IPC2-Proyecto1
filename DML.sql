USE OthelloIGame

/*Roles del sistema*/

INSERT INTO Rol (id_rol,nombre_rol)
Values('1','Administrador');

INSERT INTO Rol (id_rol,nombre_rol)
Values('2','Jugador');

SELECT * FROM Rol;


/*Inserts de usuarios*/

INSERT INTO Usuario (rol,pnombre_usuario,snombre_usuario,apellido_usuario,nombre_usuario,palabra_secreta,fecha_nacimiento,pais,correo_electronico)
Values('1','Pablo','Alejandro','Franco','pfranco','ipc2','1996/07/24','Guatemala','afranco@gmail.com');


INSERT INTO Usuario (rol,pnombre_usuario,snombre_usuario,apellido_usuario,nombre_usuario,palabra_secreta,fecha_nacimiento,pais,correo_electronico)
Values('2','Luis','Carlos','Chacón','lchacon','123','1998/12/24','México','lchacon12@gmail.com');

INSERT INTO Usuario
Values('2','Anibal','Mendez','Juarez','amjuarez','123','1997/01/31','Honduras','anibalCanibal@gmail.com');

INSERT INTO Usuario
Values('2','Pedro','Roberto','Cursio','pcursio','123','1985/02/22','El Salvador','pcursio@gmail.com');

SELECT * FROM Usuario;

delete from Usuario where id_usuario = 4
delete from Juego

INSERT INTO TipoJuego
Values('VS');

INSERT INTO TipoJuego
Values('IA');

INSERT INTO TipoJuego
Values('Torneo');

SELECT * FROM TipoJuego


SELECT tipo_partida as 'Tipo de partida', (SELECT nombre_usuario from Usuario WHERE id_usuario = jugador1) as 'jugador 1' , 
(SELECT nombre_usuario from Usuario WHERE id_usuario = jugador2) as 'jugador 2' 
FROM Juego
where tipo_partida ='torneo';

/*Procedimiento almacenado para insertar a un nuevo jugador*/
CREATE PROCEDURE sp_insertJugador(
@rol				INT,
@pnombre_usuario	VARCHAR(255),
@snombre_usuario	VARCHAR(255),
@apellido_usuario	VARCHAR(255),
@nombre_usuario		VARCHAR(255),
@palabra_secreta	VARCHAR(255),
@fecha_nacimiento	DATE,
@pais				VARCHAR(255),
@correo_electronico	VARCHAR(255)
)
AS 
BEGIN
INSERT INTO Usuario(rol,pnombre_usuario,snombre_usuario,apellido_usuario,nombre_usuario,palabra_secreta,fecha_nacimiento,pais,correo_electronico)
VALUES(@rol,@pnombre_usuario,@snombre_usuario,@apellido_usuario,@nombre_usuario,@palabra_secreta,@fecha_nacimiento,@pais,@correo_electronico);
END

/*Procedimiento almacenado para insertar un nuevo Juego*/
CREATE PROCEDURE sp_insertJuego(
@jugador1			INT,
@jugador2			VARCHAR(255),
@perdedor			TINYINT,
@ganador			TINYINT,
@empate				bit,
@punteo_jugador1	VARCHAR(255),
@punteo_jugador2	TINYINT,
@movs_jugador1		TINYINT,
@movs_jugador2		TINYINT,
@tipo_partida		VARCHAR(255),
@ronda_torneo		TINYINT,
@id_torneo			INT
)
AS 
BEGIN
INSERT INTO Juego(jugador1,jugador2,perdedor,ganador,empate,punteo_jugador1,punteo_jugador2,movs_jugador1,movs_jugador2,tipo_partida,ronda_torneo,id_torneo)
VALUES(@jugador1,@jugador2,@perdedor,@ganador,@empate,@punteo_jugador1,@punteo_jugador2,@movs_jugador1,@movs_jugador2,@tipo_partida,@ronda_torneo,@id_torneo);
END

/*Procedimiento almacenado para insertar un nuevo Torneo*/
CREATE PROCEDURE sp_insertTorneo(
@nombre_torneo		VARCHAR(255),
@ganador_torneo		INT
)
AS 
BEGIN
INSERT INTO Torneo(nombre_torneo,ganador_torneo)
VALUES(@nombre_torneo,@ganador_torneo);
END

/*Procedimiento almacenado para actualizar el juego*/

CREATE PROCEDURE sp_updateJuego (
@id_juego			int,
@perdedor			TINYINT,
@ganador			TINYINT,
@empate				bit,
@punteo_jugador1	VARCHAR(255),
@punteo_jugador2	TINYINT,
@movs_jugador1		TINYINT,
@movs_jugador2		TINYINT,
@ronda_torneo		TINYINT,
@id_torneo			INT)
AS
BEGIN
UPDATE  Juego
SET  perdedor = @perdedor, ganador = @ganador, empate = @empate, punteo_jugador1 = @punteo_jugador1,punteo_jugador2 = @punteo_jugador2, movs_jugador1 = @movs_jugador1, movs_jugador2 = @movs_jugador2, ronda_torneo = @ronda_torneo, id_torneo = @id_torneo
WHERE id_juego = @id_juego ;
END 

/*Procedimiento almacenado para actualizar los datos del usuario*/
CREATE PROCEDURE sp_updateUsuario (
@id_usuario			INT,
@rol				INT,
@pnombre_usuario	VARCHAR(255),
@snombre_usuario	VARCHAR(255),
@apellido_usuario	VARCHAR(255),
@nombre_usuario		VARCHAR(255),
@palabra_secreta	VARCHAR(255),
@fecha_nacimiento	DATE,
@pais				VARCHAR(255),
@correo_electronico	VARCHAR(255)
)
AS
BEGIN
UPDATE  Usuario
SET  rol = @rol, pnombre_usuario = @pnombre_usuario, snombre_usuario = @snombre_usuario, apellido_usuario = @apellido_usuario,nombre_usuario = @nombre_usuario, palabra_secreta = @palabra_secreta, fecha_nacimiento = @fecha_nacimiento,pais = @pais, correo_electronico = @correo_electronico
WHERE id_usuario= @id_usuario;
END 

select * from usuario;

/*Modificar un usuario*/
EXEC sp_updateUsuario @id_usuario ='1' , @rol= '1', @pnombre_usuario = 'Pablo',@snombre_usuario='Alejandro',@apellido_usuario='Franco',@nombre_usuario = 'pfranco',@palabra_secreta = 'ipc2',@fecha_nacimiento = '1996/07/24',@pais = 'Guatemala',@correo_electronico = 'afranco@gmail.com';

/*Modificar un juego*/
EXEC sp_updateJuego @id_juego ='1', @perdedor = '2', @ganador = 3, @empate='0', @punteo_jugador1 = '30', @punteo_jugador2 = '70', @movs_jugador1 = '50', @movs_jugador2 ='30', @ronda_torneo=null, @id_torneo=null;
select* from juego;
select * from usuario;

/*Vista de partidas ganadas*/
CREATE VIEW [Partidas ganadas] AS
SELECT pnombre_usuario,apellido_usuario,nombre_usuario,tipo_partida,ganador = (select nombre_usuario from Usuario where id_usuario = ganador)
FROM Usuario
INNER JOIN Juego ON Usuario.id_usuario = Juego.ganador
WHERE Usuario.id_usuario = Juego.ganador;


SELECT pnombre_usuario as 'Primer nombre', apellido_usuario as 'Apellido',nombre_usuario as'Usuario',tipo_partida as 'Tipo de Partida', (select nombre_usuario  from Usuario where id_usuario = ganador) as 'Ganador', (select nombre_usuario  from Usuario where id_usuario = perdedor) as 'Contrincante' FROM Usuario
INNER JOIN Juego ON Usuario.id_usuario = Juego.ganador
WHERE Usuario.id_usuario = Juego.ganador;