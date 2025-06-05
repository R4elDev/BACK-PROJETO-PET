/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da Temperamento
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const vacinaDAO = require('../../model/DAO/vacina.js')

const inserirVacina = async function (vacina, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            vacina.nome_vacina     == undefined || vacina.nome_vacina.length > 150 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultVacina = await vacinaDAO.insertVacina(vacina)
                if(resultVacina){
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

const atualizarVacina = async function(vacina,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                              == undefined || id                              == '' || id             == null || isNaN(id) || id         <= 0   ||
                vacina.nome_vacina              == undefined ||  vacina.nome_vacina.length         > 150  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultVacina = await buscarVacina(parseInt(id))

                if(resultVacina.status_code == 200){
                    vacina.id = parseInt(id)
                    let result = await vacinaDAO.updateVacina(vacina)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultVacina.status_code == 400){
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

const excluirVacina = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultVacina = await buscarVacina(parseInt(id))

            if(resultVacina.status_code == 200){

                let result = await vacinaDAO.deleteVacina(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultCategoria.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarVacina = async function(){
    try{
        let dadosVacina = {}

        let resultVacina = await vacinaDAO.selectAllVacina()

        if(resultVacina != false || typeof(resultVacina) == 'object'){
            if(resultVacina.length > 0){
                dadosVacina.status = true
                dadosVacina.status_code = 200
                dadosVacina.items = resultCategoria.length
                dadosVacina.vacinas = resultVacina

                return dadosVacina
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


const buscarVacina = async function(id){
    try{
        
        let idVacina = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosVacina = {}

            let resultVacina = await vacinaDAO.selectByIdVacina(parseInt(idVacina))

            if(resultVacina != false || typeof(resultVacina) == 'object'){
                if(resultVacina.length > 0){
                    dadosVacina.status = true
                    dadosVacina.status_code = 200
                    dadosVacina.vacina = resultVacina

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
    inserirVacina,
    atualizarVacina,
    excluirVacina,
    listarVacina,
    buscarVacina
}