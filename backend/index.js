const express = require('express')
const app = express()
let name='Miguel Angel'

app.get('/miguel',(request,response)=>{
    response.send('<h1>Hola, Soy '+name+'</h1><p>Soy estudiante del politécnico</p>')
})

app.listen(3000, ()=>{
    console.log("He creado mi primera API\ny Sí FUNCIONA")
})