const express = require('express');
const router = require('./routes/router');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});