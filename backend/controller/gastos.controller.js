const model = require('../models/gastos.model')

class GastosController{

    static async consultarGastos(req, res){
        
        const movimiento = await model.consultarGastos()
        res.status(200).json({
            success: true,
            data: movimiento
            })
    }

        static async obtenerCategoria(req, res){
        
        const categoria = await model.obtenerCategoria()
        res.status(200).json({
            success: true,
            data: categoria
            })
    }

}

module.exports = GastosController