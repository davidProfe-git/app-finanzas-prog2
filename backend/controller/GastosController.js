const model = require('../models/GastosModel')

class GastosController{


    static async consultarMovimientos(req,res){
        const movimiento = await model.consultarMovimientos()
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

    static async eliminarMovimiento(req,res){
        let movimiento_id = req.params.movimiento_id
        const resultado = await model.eliminarMovimiento(movimiento_id)
        res.json({
            success: true,
            message: "Movimiento eliminado correctamente",
            data: resultado
        })
    }

    static async actualizarMovimiento(req,res){
        let movimiento_id = req.params.movimiento_id
        let datos_actualizados = req.body
        const resultado = await model.actualizarMovimiento(movimiento_id, datos_actualizados)
        res.json({
            success: true,
            message: "Movimiento actualizado correctamente",
            data: resultado
        })
    }

    static async borrarTodosLosMovimientos(req, res){
        const queryResult = await model.borrarTodosLosMovimientos()
        res.json({
            success: true,
            message: "Todos los movimientos han sido eliminados correctamente",
            data: queryResult
        })
    }

}

    module.exports = GastosController