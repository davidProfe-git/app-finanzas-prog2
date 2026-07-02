const express = require('express')
const router = express.Router()
const controller = require('../controller/gastos.controller')

router.get('/movimiento', controller.consultarGastos)
router.get('/categoria', controller.obtenerCategoria)
router.get('/usuario', controller.obtenerUsuarios)

router.post('/movimiento', controller.crearGasto)
router.put('/movimiento/:id', controller.actualizarGasto)
router.delete('/movimiento/:id', controller.eliminarGasto)

module.exports = router