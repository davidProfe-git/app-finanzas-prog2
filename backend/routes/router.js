const express = require('express')
const router = express.Router()
const controller = require('../controller/gastos.controller')

router.get('/movimiento', controller.consultarGastos)

module.exports = router