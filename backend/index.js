const express = require('express')
let nombre = 'Miguel'
const app = express()

app.get('/',(solicitud,respuesta)=>{

    respuesta.send('<h1>Hola soy ' +nombre+ '</h1>')

})

app.get('/productos',(solicitud,respuesta)=>{

    respuesta.send('<h1>pagina productos de carrito</h1>')

})

app.listen(3000,()=>{
    console.log('cree un servidor en node y funciona!!')
})
