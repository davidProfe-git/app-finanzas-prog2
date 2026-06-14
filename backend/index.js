const express = require('express')
const router = require('./routes/router')
const app = express()
const cors = require('cors')

app.use(cors())
app.use('/api', router)

app.listen(3000, ()=>{
    console.log("He creado mi primera API\ny Sí FUNCIONA")
})