/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD do animal
 * Data ==> 04/06/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no Banco de Dados
const animalDAO = require('../../model/DAO/animal.js')

//Import das controlleres para criar as relações com o jogo
const controllerStatusProcesso = require('../status_processo/controllerStatusProcesso.js')
const controllerTemperamento = require('../temperamento/controllerTemperamento.js')
const controllerVacina = require('../vacina/controllerVacina.js')
const controllerStatusSaude = require('../statusSaude/controllerStatusSaude.js')
const controllerUsuario = require('../cadastroUsuario/controllerUsuario.js')
const controlleSexo = require('../sexo/controllerSexo.js')


// Função para inserir um novo jogo
const inserirAnimal = async function(animal, contentType) {
    try{
        
        if(contentType == 'application/json'){
            if(
                animal.nome                 == undefined ||            animal.nome                    == '' ||            animal.nome                    == null || animal.nome.length                     > 100    ||
                animal.idade                == undefined ||            animal.idade                   == '' ||            animal.idade                   == null || animal.idade.length                    > 25     ||
                animal.raca                 == undefined ||            animal.raca.length             > 200 ||
                animal.especie              == undefined ||            animal.especie                 == '' ||            animal.especie                 == null || animal.especie.length                  > 250    ||
                animal.foto                 == undefined ||            animal.foto                    == '' ||            animal.foto                    == null || animal.foto.length                     > 10000  ||
                animal.localizacao          == undefined ||            animal.localizacao             == '' ||            animal.localizacao             == null || animal.localizacao.length              > 250    ||
                animal.celular_responsavel  == undefined ||            animal.celular_responsavel     == '' ||            animal.celular_responsavel     == null || animal.celular_responsavel.length      > 250    ||
                animal.id_status_processo   == undefined ||            animal.id_status_processo      == '' ||            animal.id_status_processo      == null ||
                animal.id_temperamento      == undefined ||            animal.id_temperamento         == '' ||            animal.id_temperamento         == null ||
                animal.id_vacina            == undefined ||            animal.id_vacina               == '' ||            animal.id_vacina               == null ||
                animal.id_status_saude      == undefined ||            animal.id_status_saude         == '' ||            animal.id_status_saude         == null ||
                animal.id_usuario           == undefined ||            animal.id_usuario              == '' ||            animal.id_usuario              == null ||
                animal.id_sexo              == undefined ||            animal.id_sexo                 == '' ||            animal.id_sexo                 == null
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
        
                // Encaminha os dados do novo jogo para ser inserido no BD
                let resultAnimal = await animalDAO.insertAnimal(animal)

                

                if(resultAnimal){
                    const animalBuscado = await buscarAnimal(resultAnimal.id)
                    return {
                            message: MESSAGE.SUCCESS_CREATED_ITEM,
                            animalBuscado
                    };
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Função para atualizar um animal
const atualizarAnimal = async function(animal,id,contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                id                          == undefined ||            id  ==  ''    ||  id  == null  || isNaN(id)  || id <= 0 ||
                animal.nome                 == undefined ||            animal.nome                    == '' ||            animal.nome                    == null || animal.nome.length                     > 100    ||
                animal.idade                == undefined ||            animal.idade                   == '' ||            animal.idade                   == null || animal.idade.length                    > 25     ||
                animal.raca                 == undefined ||            animal.raca.length             > 200 ||
                animal.especie              == undefined ||            animal.especie                 == '' ||            animal.especie                 == null || animal.especie.length                  > 250    ||
                animal.foto                 == undefined ||            animal.foto                    == '' ||            animal.foto                    == null || animal.foto.length                     > 10000  ||
                animal.localizacao          == undefined ||            animal.localizacao             == '' ||            animal.localizacao             == null || animal.localizacao.length              > 250    ||
                animal.celular_responsavel  == undefined ||            animal.celular_responsavel     == '' ||            animal.celular_responsavel     == null || animal.celular_responsavel.length      > 250    ||
                animal.id_status_processo   == undefined ||            animal.id_status_processo      == '' ||            animal.id_status_processo      == null ||
                animal.id_temperamento      == undefined ||            animal.id_temperamento         == '' ||            animal.id_temperamento         == null ||
                animal.id_vacina            == undefined ||            animal.id_vacina               == '' ||            animal.id_vacina               == null ||
                animal.id_status_saude      == undefined ||            animal.id_status_saude         == '' ||            animal.id_status_saude         == null ||
                animal.id_usuario           == undefined ||            animal.id_usuario              == '' ||            animal.id_usuario              == null ||
                animal.id_sexo              == undefined ||            animal.id_sexo                 == '' ||            animal.id_sexo                 == null
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            }else{
                // validar se o id existe no banco

                let resultAnimal = await buscarAnimal(parseInt(id))

                if(resultAnimal.status_code == 200){

                    // Adiciona um atributo id no Json para encaminhasr id da requisição
                    animal.id = parseInt(id)
                    let result = await animalDAO.updateAnimal(animal)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultAnimal.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE // 400
        }    
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para excluir um novo animal
const excluirAnimal = async function(id) {
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultAnimal = await buscarAnimal(parseInt(id))

            if(resultAnimal.status_code == 200){
                // Código do delete
                let result = await animalDAO.deleteAnimal(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultAnimal.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Função para retornar todos os jogos
const listarAnimal = async function() {
    try{
        //Objeto do tipo array para utilizar no foreach para carregar os dados 
        //do jogo e da classificacao
        const arrayAnimais = []

        let dadosAnimais = {}

        // Chama a função para retornar os dados do jogo
        let resultAnimal = await animalDAO.selectAllAnimal()

        if(resultAnimal != false || typeof(resultAnimal) == 'object'){

            if(resultAnimal.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosAnimais.status = true
                dadosAnimais.status_code = 200
                dadosAnimais.items = resultAnimal.length
                //resultFilme.forEach(async function(itemFilme){
                //foi necessário substituir o foreach pelo for of, pois
                //o foreach não consegue trabalhar com requisições async e await

                for(itemAnimal of resultAnimal){
                    let dadosStatusProcesso = await controllerStatusProcesso.buscarStatusProcesso(itemAnimal.id_status_processo)
                        itemAnimal.status_processo = dadosStatusProcesso.status_processo
                        delete itemAnimal.id_status_processo

                        let dadosTemperamento = await controllerTemperamento.buscarTemperamento(itemAnimal.id_temperamento)
                        itemAnimal.temperamento = dadosTemperamento.temperamento
                        delete itemAnimal.id_temperamento


                        let dadosVacina = await controllerVacina.buscarVacina(itemAnimal.id_vacina)
                        itemAnimal.vacina = dadosVacina.vacina
                        delete itemAnimal.id_vacina

                        let dadosStatusSaude = await controllerStatusSaude.buscarStatusSaude(itemAnimal.id_status_saude)
                        itemAnimal.status_saude = dadosStatusSaude.status_saude
                        delete itemAnimal.id_status_saude

                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemAnimal.id_usuario)
                        itemAnimal.usuario = dadosUsuario.usuarios
                        delete itemAnimal.id_usuario


                        let dadosSexo = await controlleSexo.buscarSexo(itemAnimal.id_sexo)
                        itemAnimal.sexo = dadosSexo.sexo
                        delete itemAnimal.id_sexo
                    arrayAnimais.push(itemAnimal)
                }

                //Adiciona o novo array de filmes no JSON para retornar ao APP
                dadosAnimais.animais = arrayAnimais

                return dadosAnimais // 200
            }else{
                return MESSAGE.ERROR_NOT_FOUND // 400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }



}
// Função para buscar um jogo pelo ID
const buscarAnimal = async function(id) { 
    try{

        let arrayAnimais = []
        let idAnimal = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        }else{
            let dadosAnimais = {}
            // Chama a função para retornar os dados do jogo

            let resultAnimal = await animalDAO.selectByIdAnimal(parseInt(idAnimal))
            if(resultAnimal != false || typeof(resultAnimal) == 'object'){
                if(resultAnimal.length > 0){
                    // Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosAnimais.status = true
                    dadosAnimais.status_code = 200
                    for(itemAnimal of resultAnimal){

                        let dadosStatusProcesso = await controllerStatusProcesso.buscarStatusProcesso(itemAnimal.id_status_processo)
                        itemAnimal.status_processo = dadosStatusProcesso.status_processo
                        delete itemAnimal.id_status_processo

                        let dadosTemperamento = await controllerTemperamento.buscarTemperamento(itemAnimal.id_temperamento)
                        itemAnimal.temperamento = dadosTemperamento.temperamento
                        delete itemAnimal.id_temperamento


                        let dadosVacina = await controllerVacina.buscarVacina(itemAnimal.id_vacina)
                        itemAnimal.vacina = dadosVacina.vacina
                        delete itemAnimal.id_vacina

                        let dadosStatusSaude = await controllerStatusSaude.buscarStatusSaude(itemAnimal.id_status_saude)
                        itemAnimal.status_saude = dadosStatusSaude.status_saude
                        delete itemAnimal.id_status_saude

                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemAnimal.id_usuario)
                        itemAnimal.usuario = dadosUsuario.usuarios
                        delete itemAnimal.id_usuario

                        let dadosSexo = await controlleSexo.buscarSexo(itemAnimal.id_sexo)
                        itemAnimal.sexo = dadosSexo.sexo
                        delete itemAnimal.id_sexo


                        arrayAnimais.push(itemAnimal)
                    }

                    dadosAnimais.animal = arrayAnimais
                
                    return dadosAnimais // 200

                }else{
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirAnimal,
    atualizarAnimal,
    buscarAnimal,
    atualizarAnimal,
    listarAnimal,
    excluirAnimal
}