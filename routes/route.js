/*******************************************************************************************************************
 * Objetivo ==> Arquivo para definir as rotas dos endpoints da API
 * Data ==> 02/06/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 * *****************************************************************************************************************/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

// Import das controllers

const controllerUsuario = require('../controller/cadastroUsuario/controllerUsuario.js')
const controllerCategoria = require('../controller/categoria/controllerCategoria.js')

const bodyParserJson = bodyParser.json()

router.use(cors())

// ********************** ENDPOINTS DA TABELA CADASTRO_USUARIO ***************************** //

router.post('/usuario', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)


    response.status(resultUsuario.message.status_code)
    response.json(resultUsuario)
})

router.post('/login', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let { email, senha } = request.body

    let resultUsuario = await controllerUsuario.loginUsuario(email, senha, contentType)
    
    response.status(resultUsuario.message.status_code)
    response.json(resultUsuario)
})

router.get('/usuario', async (request, response) => {
    let resultUsuario = await controllerUsuario.listarUsuario()
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

router.get('/usuario/:id', async (request, response) => {
    let id = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(id)
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

router.delete('/usuario/:id', async (request, response) => {
    let id = request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(id)
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

router.put('/usuario/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(dadosBody, id, contentType)
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

// ********************** ENDPOINTS DA TABELA CATEGORIA ***************************** //

router.post('/categoria', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultCategoria = await controllerCategoria.inserirCategoria(dadosBody, contentType)
    
    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

router.get('/categoria', async (request, response) => {
    let resultCategoria = await controllerCategoria.listarCategoria()

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

router.get('/categoria/:id', async (request, response) => {
    let id = request.params.id

    let resultCategoria = await controllerCategoria.buscarCategoria(id)
    
    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

router.delete('/categoria/:id', async (require, response) => {
    let id = require.params.id

    let resultCategoria = await controllerCategoria.excluirCategoria(id)
    
    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

router.put('/categoria/:id', bodyParserJson, async (require, response) => {
    let contentType = require.headers['content-type']
    let id = require.params.id
    let dadosBody = require.body

    let resultCategoria = await controllerCategoria.atualizarCategoria(dadosBody, id, contentType)
    
    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})


module.exports = router