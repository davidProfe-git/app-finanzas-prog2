const express = require('express')
const router = require('./routes')
const app = express()

app.use('/api',router)

let name='Miguel Angel Calderon'

app.get('/miguel',(request,response)=>{
    response.send('<h1>Hola, Soy '+name+'</h1><p>Soy estudiante del politécnico</p>')
})

app.listen(3000, ()=>{
    console.log("He creado mi primera API\ny Sí FUNCIONA")
})