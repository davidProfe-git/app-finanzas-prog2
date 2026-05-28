const express = require('express')
const router = express.Router()
const gastosController = require('../controller/GastosController')

router.get('/movimientos', gastosController.consultarGastos)