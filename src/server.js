import sgdb from '../database/sgdb.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import cria_rotas from './rotas/cria-rotas.js'
import cria_rotas_frases from './rotas/cria-rotas-frases.js'
import auth from './auth.js'  

await sgdb.init()

const app = express()
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({   
    extended: true
}));
app.use(cors())


app.get('/', function (req, res) {
    res.send('Olá, este é seu servidor de API. Ele está sendo executado corretamente.')
})

// get token
app.post('/auth/getToken', auth.authentication )

// cria rotas das questoes
cria_rotas(app,'/questoes','questions')

cria_rotas_frases(app,'/frases','Frases')


app.listen(3000, () => {
    console.log('🔥 estou escutando na porta 3000');
})

