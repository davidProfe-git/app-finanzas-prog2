const express = require('express')
let nombre = 'Edwin Ortega'
const app = express()

app.get('/Luisa',(Solicitud,Respuesta)=>{
    Respuesta.send('<h1>Hola soy ' +nombre+'<h1>')
})

app.get('/Productos',(Solicitud,Respuesta)=>{
    Respuesta.send('<h1> Productos de carrito <h1>')
})

app.listen(3000,()=>{
    console.log('cree un servidor en node y funciona!!')
})