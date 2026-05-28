const model = require('../models/GastosModel')

class GastosController{

    static async consultarGastos(req,res){

        const movimiento = await model.consultarGastos()
        res.json({
            success: true,
            data: movimiento
        })

        }
    }

    module.exports = GastosController