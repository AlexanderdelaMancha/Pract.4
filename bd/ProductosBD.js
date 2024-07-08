const ConectarBD = require("./ConectarBD");

class ProductoBD extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoProducto(datosProducto) {
        const sql = "INSERT INTO productos (Nombre_del_producto, descripcion, precio) VALUES (?, ?, ?)";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [datosProducto.nombre, datosProducto.descripcion, datosProducto.precio]);
            console.log("Se registró un nuevo producto");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al registrar un producto: " + error);
        }
    }

    async mostrarProductos() {
        const sql = "SELECT * FROM productos;";
        try {
            await this.conectarMySql();
            const [productosMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Se mostraron los datos correctamente");
            return productosMySql;
        } catch (error) {
            console.error("Error al mostrar los datos: " + error);
        }
    }

    async productoID(id) {
        const sql = "SELECT * FROM productos WHERE ID_Producto = ?";
        try {
            await this.conectarMySql();
            const [[producto]] = await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return producto;
        } catch (error) {
            console.error("Error al consultar con id: " + error);
        }
    }

    async editarProducto(producto) {
        const sql = "UPDATE productos SET Nombre_del_producto = ?, descripcion = ?, precio = ? WHERE ID_Producto = ?";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [producto.nombre, producto.descripcion, producto.precio, producto.id_producto]);
            await this.cerrarConexion();
            console.log("Actualización correcta de producto");
        } catch (error) {
            console.error("Error al actualizar el producto: " + error);
        }
    }

    async borrarProducto(id) {
        const sql = "DELETE FROM productos WHERE ID_Producto = ?";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Producto eliminado");
        } catch (error) {
            console.error("Error al eliminar el producto: " + error);
        }
    }
}

module.exports = ProductoBD;
