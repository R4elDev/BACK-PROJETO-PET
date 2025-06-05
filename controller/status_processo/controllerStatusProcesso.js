/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da Temperamento
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const statusProcessoDAO = require('../../model/DAO/status_processo.js')

const inserirStatusProcesso = async function (statusProcesso, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            statusProcesso.status_processo    == undefined || statusProcesso.status_processo.length > 150 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultStatusProcesso = await statusProcessoDAO.insertStatusProcesso(statusProcesso)
                if(resultStatusProcesso){
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

const atualizarStatusProcesso = async function(statusProcesso,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                                          == undefined || id                              == '' || id             == null || isNaN(id) || id         <= 0   ||
               statusProcesso.status_processo               == undefined ||  statusProcesso.status_processo.length         > 150  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultStatusProcesso = await buscarStatusProcesso(parseInt(id))

                if(resultStatusProcesso.status_code == 200){
                    statusProcesso.id = parseInt(id)
                    let result = await statusProcessoDAO.updateStatusProcesso(statusProcesso)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultStatusProcesso.status_code == 400){
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

const excluirStatusProcesso = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultStatusProcesso = await buscarStatusProcesso(parseInt(id))

            if(resultStatusProcesso.status_code == 200){

                let result = await statusProcessoDAO.deleteStatusProcesso(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultStatusProcesso.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarStatusProcesso= async function(){
    try{
        let dadosStatusProcesso = {}

        let resultStatusProcesso = await statusProcessoDAO.selectAllStatusProcesso()

        

        if(resultStatusProcesso != false || typeof(resultStatusProcesso) == 'object'){
            if(resultStatusProcesso.length > 0){
                dadosStatusProcesso.status = true
                dadosStatusProcesso.status_code = 200
                dadosStatusProcesso.items = resultStatusProcesso.length
                dadosStatusProcesso.status_processo = resultStatusProcesso

                
                return dadosStatusProcesso
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const buscarStatusProcesso = async function(id){
    try{
        
        let idStatusProcesso = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosStatusProcesso = {}

            let resultStatusProcesso = await statusProcessoDAO.selectByIdStatusProcesso(parseInt(idStatusProcesso))

            if(resultStatusProcesso != false || typeof(resultStatusProcesso) == 'object'){
                if(resultStatusProcesso.length > 0){
                    dadosStatusProcesso.status = true
                    dadosStatusProcesso.status_code = 200
                    dadosStatusProcesso.status_processo = resultStatusProcesso

                    return dadosStatusProcesso
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
    inserirStatusProcesso,
    atualizarStatusProcesso,
    excluirStatusProcesso,
    listarStatusProcesso,
    buscarStatusProcesso
}