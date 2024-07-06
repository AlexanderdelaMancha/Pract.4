const ConectarBD = require("./ConectarBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoProducto(datosProducto){
        const sql = "insert into productos values (null,'"+datosProducto.nombre+"','"+datosProducto.descripcion+"','"+datosProducto.precio+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            console.log("Se registro un nuevo producto");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al registrar un producto: "+error);
            console.error(sql);
        }
    }
}