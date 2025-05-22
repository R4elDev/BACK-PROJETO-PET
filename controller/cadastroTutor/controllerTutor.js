/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da cadastro Tutor
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const cadastroTutorDAO = require('../../model/DAO/cadastro_tutor.js')

const inserirTutor = async function (tutor, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            tutor.nome      == undefined || tutor.nome     == '' || tutor.nome     == null || tutor.nome.length     > 100 ||
            tutor.email     == undefined || tutor.email    == '' || tutor.email    == null || tutor.email.length    > 150 ||
            tutor.endereco  == undefined || tutor.endereco == '' || tutor.endereco == null || tutor.endereco.length > 200 ||
            tutor.cnpj      == undefined || tutor.cnpj     == '' || tutor.cnpj     == null || tutor.cnpj.length     > 100 ||
            tutor.senha     == undefined || tutor.senha    == '' || tutor.senha    == null || tutor.senha.length    > 100 ||
            tutor.data_nascimento  == undefined || tutor.data_nascimento == '' || tutor.data_nascimento == null || tutor.data_nascimento.length > 100
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultTutor = await cadastroTutorDAO.insertTutor(tutor)
                if(resultTutor){
                    return MESSAGE.SUCCESS_CREATED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarTutor = async function(tutor,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id              == undefined || id             == '' || id             == null || isNaN(id) || id      <= 0   ||
                tutor.nome      == undefined || tutor.nome     == '' || tutor.nome     == null || tutor.nome.length     > 100 ||
                tutor.email     == undefined || tutor.email    == '' || tutor.email    == null || tutor.email.length    > 150 ||
                tutor.endereco  == undefined || tutor.endereco == '' || tutor.endereco == null || tutor.endereco.length > 200 ||
                tutor.cnpj      == undefined || tutor.cnpj     == '' || tutor.cnpj     == null || tutor.cnpj.length     > 100 ||
                tutor.senha     == undefined || tutor.senha    == '' || tutor.senha    == null || tutor.senha.length    > 100 ||
                tutor.data_nascimento  == undefined || tutor.data_nascimento == '' || tutor.data_nascimento == null || tutor.data_nascimento.length > 100
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultTutor = await buscarTutor(parseInt(id))

                if(resultTutor.status_code == 200){
                    tutor.id = parseInt(id)
                    let result = await cadastroTutorDAO.updateTutor(tutor)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultTutor.status_code == 400){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirTutor = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultTutor = await buscarTutor(parseInt(id))

            if(resultTutor.status_code == 200){

                let result = await cadastroTutorDAO.deleteTutor(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultTutor.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarTutor = async function(){
    try{
        let dadosTutores = {}

        let resultTutores = await cadastroTutorDAO.selectAllTutor()

        if(resultTutores != false || typeof(resultTutores) == 'object'){
            if(resultTutores.length > 0){
                dadosTutores.status = true
                dadosTutores.status_code = 200
                dadosTutores.items = resultTutores.length
                dadosTutores.tutores = resultTutores

                return dadosTutores
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const buscarTutor = async function(id){
    try{
        
        let idTutor = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosTutores = {}

            let resultTutor = await cadastroTutorDAO.selectByIdTutor(parseInt(idTutor))

            if(resultTutor != false || typeof(resultTutor) == 'object'){
                if(resultTutor.length > 0){
                    dadosTutores.status = true
                    dadosTutores.status_code = 200
                    dadosTutores.tutores = resultTutor

                    return dadosTutores
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirTutor,
    atualizarTutor,
    excluirTutor,
    listarTutor,
    buscarTutor
}