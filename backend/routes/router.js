const express = require('express')
const router = express.Router()

const controller = require('../controller/gastos.controller')

router.get('/movimiento', controller.consultarGastos)

router.get('/categoria', controller.obtenerCategoria)

module.exports = router