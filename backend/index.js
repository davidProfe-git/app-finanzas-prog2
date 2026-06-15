const express = require('express')
const router = require('./routers/router')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(3000, ()=>{
    console.log('cree un servidor en node y funciona!!')
})