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
const controllerStatusProcesso = require('../controller/status_processo/controllerStatusProcesso.js')
const controllerTemperamento = require('../controller/temperamento/controllerTemperamento.js')
const controllerVacina = require('../controller/vacina/controllerVacina.js')
const controllerStatusSaude = require('../controller/statusSaude/controllerStatusSaude.js')
const controllerAnimal = require('../controller/animal/controllerAnimal.js')
const controllerSexo = require('../controller/sexo/controllerSexo.js')

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

    console.log(resultUsuario)
    
    response.status(resultUsuario.message.status_code || resultUsuario.status_code)
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

// ********************** ENDPOINTS DA TABELA STATUS_PROCESSO ***************************** //

router.post('/status-processo', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultStatusProcesso = await controllerStatusProcesso.inserirStatusProcesso(dadosBody, contentType)


    response.status(resultStatusProcesso.status_code)
    response.json(resultStatusProcesso)
})

router.get('/status-processo', async (request, response) => {
    let resultStatusProcesso = await controllerStatusProcesso.listarStatusProcesso()
    
    

    response.status(resultStatusProcesso.status_code)
    response.json(resultStatusProcesso)
})

router.get('/status-processo/:id', async (request, response) => {
    let id = request.params.id

    let resultStatusProcesso = await controllerStatusProcesso.buscarStatusProcesso(id)
    
    response.status(resultStatusProcesso.status_code)
    response.json(resultStatusProcesso)
})

router.delete('/status-processo/:id', async (request, response) => {
    let id = request.params.id

    let resultStatusProcesso = await controllerStatusProcesso.excluirStatusProcesso(id)
    
    response.status(resultStatusProcesso.status_code)
    response.json(resultStatusProcesso)
})

router.put('/status-processo/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultStatusProcesso = await controllerStatusProcesso.atualizarStatusProcesso(dadosBody, id, contentType)
    
    response.status(resultStatusProcesso.status_code)
    response.json(resultStatusProcesso)
})

// ********************** ENDPOINTS DA TABELA TEMPERAMENTO ***************************** //

router.post('/temperamento', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultTemperamento = await controllerTemperamento.inserirTemperamento(dadosBody, contentType)


    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

router.get('/temperamento', async (request, response) => {
    let resultTemperamento = await controllerTemperamento.listarTemperamento()
    
    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

router.get('/temperamento/:id', async (request, response) => {
    let id = request.params.id

    let resultTemperamento = await controllerTemperamento.buscarTemperamento(id)
    
    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

router.delete('/temperamento/:id', async (request, response) => {
    let id = request.params.id

    let resultTemperamento = await controllerTemperamento.excluirTemperamento(id)
    
    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

router.put('/temperamento/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultTemperamento = await controllerTemperamento.atualizarTemperamento(dadosBody, id, contentType)
    
    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

// ********************** ENDPOINTS DA TABELA VACINA ***************************** //

router.post('/vacina', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultVacina = await controllerVacina.inserirVacina(dadosBody, contentType)


    response.status(resultVacina.status_code)
    response.json(resultVacina)
})

router.get('/vacina', async (request, response) => {
    let resultVacina = await controllerVacina.listarVacina()
    
    response.status(resultVacina.status_code)
    response.json(resultVacina)
})

router.get('/vacina/:id', async (request, response) => {
    let id = request.params.id

    let resultVacina = await controllerVacina.buscarVacina(id)
    
    response.status(resultVacina.status_code)
    response.json(resultVacina)
})

router.delete('/vacina/:id', async (request, response) => {
    let id = request.params.id

    let resultVacina = await controllerVacina.excluirVacina(id)
    
    response.status(resultVacina.status_code)
    response.json(resultVacina)
})

router.put('/vacina/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultVacina = await controllerVacina.atualizarVacina(dadosBody, id, contentType)
    
    response.status(resultVacina.status_code)
    response.json(resultVacina)
})

// ********************** ENDPOINTS DA TABELA STATUS-SAUDE ***************************** //

router.post('/status-saude', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultStatusSaude = await controllerStatusSaude.inserirStatusSaude(dadosBody, contentType)


    response.status(resultStatusSaude.status_code)
    response.json(resultStatusSaude)
})

router.get('/status-saude', async (request, response) => {
    let resultStatusSaude = await controllerStatusSaude.listarStatusSaude()
    
    response.status(resultStatusSaude.status_code)
    response.json(resultStatusSaude)
})

router.get('/status-saude/:id', async (request, response) => {
    let id = request.params.id

    let resultStatusSaude = await controllerStatusSaude.buscarStatusSaude(id)
    
    response.status(resultStatusSaude.status_code)
    response.json(resultStatusSaude)
})

router.delete('/status-saude/:id', async (request, response) => {
    let id = request.params.id

    let resultStatusSaude = await controllerStatusSaude.excluirStatusSaude(id)
    
    response.status(resultStatusSaude.status_code)
    response.json(resultStatusSaude)
})

router.put('/status-saude/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultStatusSaude = await controllerStatusSaude.atualizarStatusSaude(dadosBody, id, contentType)
    
    response.status(resultStatusSaude.status_code)
    response.json(resultStatusSaude)
})

// ********************** ENDPOINTS DA TABELA ANIMAL ***************************** //

router.post('/animal', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultAnimal = await controllerAnimal.inserirAnimal(dadosBody, contentType)

    

    response.status(resultAnimal.message.status_code)
    response.json(resultAnimal)
})

router.get('/animal', async (request, response) => {
    let resultAnimal = await controllerAnimal.listarAnimal()
    
    response.status(resultAnimal.status_code)
    response.json(resultAnimal)
})

router.get('/animal/:id', async (request, response) => {
    let id = request.params.id

    let resultAnimal = await controllerAnimal.buscarAnimal(id)
    
    response.status(resultAnimal.status_code)
    response.json(resultAnimal)
})

router.delete('/animal/:id', async (request, response) => {
    let id = request.params.id

    let resultAnimal = await controllerAnimal.excluirAnimal(id)
    
    response.status(resultAnimal.status_code)
    response.json(resultAnimal)
})

router.put('/animal/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultAnimal = await controllerAnimal.atualizarAnimal(dadosBody, id, contentType)
    
    response.status(resultAnimal.status_code)
    response.json(resultAnimal)
})

// ********************** ENDPOINTS DA TABELA SEXO ***************************** //

router.post('/sexo', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultSexo = await controllerSexo.inserirSexo(dadosBody, contentType)


    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

router.get('/sexo', async (request, response) => {
    let resultSexo = await controllerSexo.listarSexo()
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

router.get('/sexo/:id', async (request, response) => {
    let id = request.params.id

    let resultSexo = await controllerSexo.buscarSexo(id)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

router.delete('/sexo/:id', async (request, response) => {
    let id = request.params.id

    let resultSexo = await controllerSexo.excluirSexo(id)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

router.put('/sexo/:id', bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let resultSexo = await controllerSexo.atualizarSexo(dadosBody, id, contentType)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})



module.exports = router