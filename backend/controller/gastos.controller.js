const model = require('../models/gastos.model')


class GastosController{


    static async consultarGastos(req,res){
        
        const movimiento = await model.consultarGastos()

        res.status(200).json({
            success:true,
            data:movimiento
        })
    }




    static async obtenerCategoria(req,res){
        
        const categoria = await model.obtenerCategoria()

        res.status(200).json({
            success:true,
            data:categoria
        })
    }




    static async crearMovimiento(req,res){

        try{


            const {valor,tipo,id_categoria}=req.body


            const resultado =
            await model.crearMovimiento({

                valor,
                tipo,
                id_categoria

            })


            res.json({

                success:true,
                data:resultado

            })


        }catch(error){


            res.json({

                success:false,
                error:error.message

            })


        }

    }






    static async crearCategoria(req,res){

        try{


            const {nombre}=req.body


            const resultado =
            await model.crearCategoria(nombre)



            res.json({

                success:true,
                data:resultado

            })



        }catch(error){


            res.json({

                success:false,
                error:error.message

            })


        }


    }

        static async resumen(req,res){


    const datos =
    await model.resumen();


    res.json({

        success:true,

        data:datos

    });


}

}



module.exports = GastosController