/*******************************************************************************************************************
 * Objetivo ==> Api referente ao projeto de adoçao de pets
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 * 
 * Observação:
 *      ****** PARA CONFIGURAR E INSTALAR A API, PRECISAMOS DAS SEGUINTE BIBLIOTECA ********
 *                      express                  npm install express --save
 *                      cors                     npm install cors --save
 *                      body-parser              npm install body-parser --save
 * 
 *      ****** PARA CONFIGURAR E INSTALAR O ACESSO AO BANCO DE DADOS, PRECISAMOS: ********
 *                      prisma                 npm install prisma --save ( Conexão com o BD )
 *                      prisma/client          npm install @prisma/client --save ( Executa scripts no BD )
 *    
 *      ******* Após a instalação do prisma e do primsa client, devemos:
 *                  npx prisma init ( ! INICIALIAR O PRISMA NO PROJETO !)
 * 
 *      ******* Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
 *                  npx prisma migrate dev
 * 
 * 
 * ************************
 * 
 * POST E PUT PRECISAM DO BodyParserJson para funcionar
 **********************************************************************************************************************/

 const express   = require('express')
 const cors      = require('cors')
 const bodyParser = require('body-parser')

 // Import das controllers 
const controllerUsuario = require('./controller/cadastroUsuario/controllerUsuario.js')
const controllerCategoria = require('./controller/categoria/controllerCategoria.js')


 // Estabelecendo o formato de dados que deverá chegar no BODY da requisição (POST ou PUT)
const bodyParserJson = bodyParser.json()

// Cria o objeto app para criar a api
const app = express()

app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

// ********************** ENDPOINTS DA TABELA CADASTRO_USUARIO ***************************** //

app.post('/v1/controle-pet/usuario',cors(),bodyParserJson,async function(request,response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody,contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-pet/usuario',cors(),bodyParserJson,async function(request,response){
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-pet/usuario/:id',cors(),bodyParserJson,async function(request,response){
    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.delete('/v1/controle-pet/usuario/:id',cors(),bodyParserJson,async function(request,response){
    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-pet/usuario/:id',cors(),bodyParserJson,async function(request,response){
    let contentType = request.headers['content-type']

    let idUsuario = request.params.id

    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(dadosBody,idUsuario,contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})


// ********************** ENDPOINTS DA TABELA CATEGORIA ***************************** //

app.post('/v1/controle-pet/categoria',cors(),bodyParserJson,async function(request,response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultCategoria = await controllerCategoria.inserirCategoria(dadosBody,contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.get('/v1/controle-pet/categoria',cors(),bodyParserJson,async function(request,response){
    let resultCategoria = await controllerCategoria.listarCategoria()

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.get('/v1/controle-pet/categoria/:id',cors(),bodyParserJson,async function(request,response){
    let idCategoria = request.params.id

    let resultCategoria = await controllerCategoria.buscarCategoria(idCategoria)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.delete('/v1/controle-pet/categoria/:id',cors(),bodyParserJson,async function(request,response){
    let idCategoria = request.params.id

    let resultCategoria = await controllerCategoria.excluirCategoria(idCategoria)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.put('/v1/controle-pet/categoria/:id',cors(),bodyParserJson,async function(request,response){
    let contentType = request.headers['content-type']

    let idCategoria = request.params.id

    let dadosBody = request.body

    let resultCategoria = await controllerCategoria.atualizarCategoria(dadosBody,idCategoria,contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.listen('8080',function(){
    console.log('API FUNCIONANDO AGUARDANDO REQUESIÇÕES CHEFE...')
})



