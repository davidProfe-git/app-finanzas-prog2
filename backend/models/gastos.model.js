class GastosModel {

    static async consultarGastos() {
        return [
            {
                nombre: 'Prueba',
                valor: 1000,
                tipo: 'Ingreso'
            }
        ]
    }

    static async obtenerCategoria() {
        return [
            {
                id: 1,
                nombre: 'Salario'
            }
        ]
    }

}

module.exports = GastosModel