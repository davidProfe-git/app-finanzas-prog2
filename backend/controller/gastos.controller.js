const model = require('../models/gastos.model')

class GastosController{

    static async consultarGastos(req, res){
        
        const movimiento = await model.consultarGastos()
        res.status(200).json({
            success: true,
            data: movimiento
            })

    }

}

module.exports = GastosController