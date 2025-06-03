/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD de StatusSaude
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const statusSaudeDAO = require('../../model/DAO/status_saude.js')

const inserirStatusSaude = async function (statusSaude, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
                statusSaude.status_saude    == undefined || statusSaude.status_saude.length > 150 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultStatusSaude = await statusSaudeDAO.insertStatusSaude(statusSaude)
                if(resultStatusSaude){
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

const atualizarStatusSaude = async function(statusSaude,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                                          == undefined || id                              == '' || id             == null || isNaN(id) || id         <= 0   ||
                statusSaude.status_saude               == undefined ||  statusSaude.status_saude.length         > 150  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultStatusSaude = await buscarStatusSaude(parseInt(id))

                if(resultStatusSaude.status_code == 200){
                    statusSaude.id = parseInt(id)
                    let result = await statusSaudeDAO.updateStatusSaude(statusSaude)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultStatusSaude.status_code == 400){
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

const excluirStatusSaude  = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultStatusSaude = await buscarStatusSaude(parseInt(id))

            if(resultStatusSaude.status_code == 200){

                let result = await statusSaudeDAO.deleteStatusSaude(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultStatusSaude.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarStatusSaude = async function(){
    try{
        let dadosStatusSaude = {}

        let resultStatusSaude = await statusSaudeDAO.selectAllStatusSaude()

        if(resultStatusSaude != false || typeof(resultStatusSaude) == 'object'){
            if(resultStatusSaude.length > 0){
                dadosStatusSaude.status = true
                dadosStatusSaude.status_code = 200
                dadosStatusSaude.items = resultStatusSaude.length
                dadosStatusSaude.status_saude = resultStatusSaude

                return dadosStatusSaude
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


const buscarStatusSaude= async function(id){
    try{
        
        let idStatusSaude = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosStatusSaude = {}

            let resultStatusSaude = await statusSaudeDAO.selectByIdStatusSaude(parseInt(idStatusSaude))

            if(resultStatusSaude != false || typeof(resultStatusSaude) == 'object'){
                if(resultStatusSaude.length > 0){
                    dadosStatusSaude.status = true
                    dadosStatusSaude.status_code = 200
                    dadosStatusSaude.status_saude = resultStatusSaude

                    return dadosStatusSaude
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
    inserirStatusSaude,
    atualizarStatusSaude,
    excluirStatusSaude,
    listarStatusSaude,
    buscarStatusSaude
}