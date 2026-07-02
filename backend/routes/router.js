const express = require('express')
const router = express.Router()

const controller = require('../controller/gastos.controller')


router.get('/movimiento', controller.consultarGastos)

router.get('/categoria', controller.obtenerCategoria)


router.post('/movimiento',controller.crearMovimiento)

router.post('/categoria',controller.crearCategoria)

router.get('/resumen', controller.resumen)

router.delete("/movimiento/:id", controller.eliminarMovimiento)


module.exports = router