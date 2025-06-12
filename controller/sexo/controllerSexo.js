/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da sexo
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const sexoDAO = require('../../model/DAO/sexo.js')

const inserirSexo = async function (sexo, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            sexo.sexo    == undefined || sexo.sexo.length > 45
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultSexo = await sexoDAO.insertSexo(sexo)
                if(resultSexo){
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

const atualizarSexo = async function(sexo,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                      == undefined || id                              == '' || id             == null || isNaN(id) || id         <= 0   ||
                sexo.sexo               == undefined ||  sexo.sexo.length         > 45  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultSexo = await buscarSexo(parseInt(id))

                if(resultSexo.status_code == 200){
                    sexo.id = parseInt(id)
                    let result = await sexoDAO.updateSexo(sexo)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultSexo.status_code == 400){
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

const excluirSexo = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultSexo = await buscarSexo(parseInt(id))

            if(resultSexo.status_code == 200){

                let result = await sexoDAO.deleteSexo(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultSexo.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarSexo= async function(){
    try{
        let dadosSexo = {}

        let resultSexo = await sexoDAO.selectAllSexo()

        

        if(resultSexo != false || typeof(resultSexo) == 'object'){
            if(resultSexo.length > 0){
                dadosSexo.status = true
                dadosSexo.status_code = 200
                dadosSexo.items = resultSexo.length
                dadosSexo.sexo = resultSexo

                
                return dadosSexo
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


const buscarSexo = async function(id){
    try{
        
        let idSexo = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosSexo = {}

            let resultSexo = await sexoDAO.selectByIdSexo(parseInt(idSexo))

            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.sexo = resultSexo

                    return dadosSexo
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
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo
}