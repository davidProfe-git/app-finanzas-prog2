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

    static async crearMovimiento(req,res){
        let datos_movimiento = req.body
        const resultado = await model.crearMovimiento(datos_movimiento)
        res.json({
            success: true,
            message: "Movimiento creado correctamente",
            data: resultado
        })

    }
}

    module.exports = GastosController