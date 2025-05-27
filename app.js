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
const controllerTutor = require('./controller/cadastroTutor/controllerTutor.js')
const controllerOng = require('./controller/cadastro_ong/controllerOng.js')


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

// ********************** ENDPOINTS DA TABELA CADASTRO_TUTOR ***************************** //

app.post('/v1/controle-pet/tutor',cors(),bodyParserJson,async function(request,response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultTutor = await controllerTutor.inserirTutor(dadosBody,contentType)

    response.status(resultTutor.status_code)
    response.json(resultTutor)
})

app.get('/v1/controle-pet/tutor',cors(),bodyParserJson,async function(request,response){
    let resultTutor = await controllerTutor.listarTutor()

    response.status(resultTutor.status_code)
    response.json(resultTutor)
})

app.get('/v1/controle-pet/tutor/:id',cors(),bodyParserJson,async function(request,response){
    let idTutor = request.params.id

    let resultTutor = await controllerTutor.buscarTutor(idTutor)

    response.status(resultTutor.status_code)
    response.json(resultTutor)
})

app.delete('/v1/controle-pet/tutor/:id',cors(),bodyParserJson,async function(request,response){
    let idTutor = request.params.id

    let resultTutor = await controllerTutor.excluirTutor(idTutor)

    response.status(resultTutor.status_code)
    response.json(resultTutor)
})

app.put('/v1/controle-pet/tutor/:id',cors(),bodyParserJson,async function(request,response){
    let contentType = request.headers['content-type']

    let idTutor = request.params.id

    let dadosBody = request.body

    let resultTutor = await controllerTutor.atualizarTutor(dadosBody,idTutor,contentType)

    response.status(resultTutor.status_code)
    response.json(resultTutor)
})


// ********************** ENDPOINTS DA TABELA CADASTRO_ONG ***************************** //

app.post('/v1/controle-pet/ong',cors(),bodyParserJson,async function(request,response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultOng = await controllerOng.inserirOng(dadosBody,contentType)

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.get('/v1/controle-pet/ong',cors(),bodyParserJson,async function(request,response){
    let resultOng = await controllerOng.listarOng()

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.get('/v1/controle-pet/ong/:id',cors(),bodyParserJson,async function(request,response){
    let idOng = request.params.id

    let resultOng = await controllerOng.buscarOng(idOng)

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.delete('/v1/controle-pet/ong/:id',cors(),bodyParserJson,async function(request,response){
    let idOng = request.params.id

    let resultOng = await controllerOng.excluirOng(idOng)

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.put('/v1/controle-pet/ong/:id',cors(),bodyParserJson,async function(request,response){
    let contentType = request.headers['content-type']

    let idOng = request.params.id

    let dadosBody = request.body

    let resultOng = await controllerOng.atualizarOng(dadosBody,idOng,contentType)

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.listen('8080',function(){
    console.log('API FUNCIONANDO AGUARDANDO REQUESIÇÕES CHEFE...')
})



