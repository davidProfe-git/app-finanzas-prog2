const express = require('express')
const router = express.Router()
const gastosController = require('../controller/GastosController')

router.get('/movimientos', gastosController.consultarGastos)
router.get('/categorias', gastosController.consultarCategorias)
router.post('/submit/movimiento', gastosController.crearMovimiento)
router.delete('/delete/movimiento/:movimiento_id', gastosController.eliminarMovimiento)
router.put('/update/movimiento/:movimiento_id', gastosController.actualizarMovimiento)

module.exports = router