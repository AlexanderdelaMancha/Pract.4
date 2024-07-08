const ConectarBD = require("./ConectarBD");

class UsuarioBD extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoUsuario(datosUsuario) {
        const sql = "INSERT INTO Usuarios (Nombre, Celular, Correo) VALUES (?, ?, ?)";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [datosUsuario.nombre, datosUsuario.celular, datosUsuario.correo]);
            console.log("Crea un nuevo usuario");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar un usuario nuevo: " + error);
        }
    }

    async mostrarUsuarios() {
        const sql = "SELECT * FROM Usuarios;";
        try {
            await this.conectarMySql();
            const [usuarioMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Se mostraron los datos correctamente");
            return usuarioMySql;
        } catch (error) {
            console.error("Error al mostrar los datos: " + error);
        }
    }

    async UsuarioID(id) {
        const sql = "SELECT * FROM Usuarios WHERE ID_Usuario = ?";
        try {
            await this.conectarMySql();
            const [[usuario]] = await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return usuario;
        } catch (error) {
            console.error("Error al consultar con id " + error);
        }
    }

    async editarUsuario(usuario) {
        const sql = "UPDATE Usuarios SET Nombre = ?, Celular = ?, Correo = ? WHERE ID_Usuario = ?";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [usuario.nombre, usuario.celular, usuario.correo, usuario.id_usuario]);
            await this.cerrarConexion();
            console.log("Actualización correcta de usuario");
        } catch (error) {
            console.error("Error al actualizar el usuario: " + error);
        }
    }

    async borrarUsuario(id) {
        const sql = "DELETE FROM Usuarios WHERE ID_Usuario = ?";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Usuario eliminado");
        } catch (error) {
            console.error("Error al eliminar el usuario: " + error);
        }
    }
}

module.exports = UsuarioBD;
