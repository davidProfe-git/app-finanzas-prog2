const model = require('../models/GastosModel')

class GastosController{


    static async consultarGastos(req,res){
        const movimiento = await model.consultarGastos()
        res.json({
            success: true,
            data: movimiento
        })
    }

    static async consultarCategorias(req,res){
        const categorias = await model.consultarCategorias()
        res.json({
            success: true,
            data: categorias
        })
    }
}

    module.exports = GastosController