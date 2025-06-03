/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da Temperamento
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const temperamentoDAO = require('../../model/DAO/temperamento.js')

const inserirTemperamento = async function (temperamento, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            temperamento.nome_temperamento     == undefined || temperamento.nome_temperamento.length > 150 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultTemperamento = await temperamentoDAO.insertTemperamento(temperamento)
                if(resultTemperamento){
                    return MESSAGE.SUCCESS_CREATED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarTemperamento = async function(temperamento,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                                          == undefined || id                              == '' || id             == null || isNaN(id) || id         <= 0   ||
                temperamento.nome_temperamento              == undefined ||  temperamento.nome_temperamento.length         > 150  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultTemperamento = await buscarTemperamento(parseInt(id))

                if(resultTemperamento.status_code == 200){
                    temperamento.id = parseInt(id)
                    let result = await temperamentoDAO.updateTemperamento(temperamento)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultTemperamento.status_code == 400){
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

const excluirTemperamento = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultTemperamento = await buscarTemperamento(parseInt(id))

            if(resultTemperamento.status_code == 200){

                let result = await temperamentoDAO.deleteTemperamento(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultTemperamento.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarTemperamento = async function(){
    try{
        let dadosTemperamento = {}

        let resultTemperamento = await temperamentoDAO.selectAllTemperamento()

        if(resultTemperamento != false || typeof(resultTemperamento) == 'object'){
            if(resultTemperamento.length > 0){
                dadosTemperamento.status = true
                dadosTemperamento.status_code = 200
                dadosTemperamento.items = resultTemperamento.length
                dadosTemperamento.vacinas = resultTemperamento

                return resultTemperamento
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


const buscarTemperamento = async function(id){
    try{
        
        let idTemperamento = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosTemperamento = {}

            let resultTemperamento = await temperamentoDAO.selectByIdTemperamento(parseInt(idTemperamento))

            if(resultTemperamento != false || typeof(resultTemperamento) == 'object'){
                if(resultTemperamento.length > 0){
                    dadosTemperamento.status = true
                    dadosTemperamento.status_code = 200
                    dadosTemperamento.temperamento = resultTemperamento

                    return dadosVacina
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
    inserirTemperamento,
    atualizarTemperamento,
    excluirTemperamento,
    listarTemperamento,
    buscarTemperamento
}