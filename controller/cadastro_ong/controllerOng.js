/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da cadastro Tutor
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const cadastroOngDAO = require('../../model/DAO/cadastro_ong.js')

const inserirOng = async function (ong, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            ong.nome      == undefined || ong.nome     == '' || ong.nome     == null || ong.nome.length         > 100 ||
            ong.email     == undefined || ong.email    == '' || ong.email    == null || ong.email.length        > 150 ||
            ong.regiao    == undefined || ong.regiao   == '' || ong.regiao   == null || ong.regiao.length       > 100 ||
            ong.endereco  == undefined || ong.endereco == '' || ong.endereco == null || ong.endereco.length     > 200
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultOng = await cadastroOngDAO.insertOng(ong)
                if(resultOng){
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

const atualizarOng = async function(ong,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id              == undefined || id              == '' || id             == null || isNaN(id) || id         <= 0   ||
                ong.nome        == undefined || ong.nome        == '' || ong.nome       == null || ong.nome.length         > 100  ||
                ong.email       == undefined || ong.email       == '' || ong.email      == null || ong.email.length        > 150  ||
                ong.regiao      == undefined || ong.regiao      == '' || ong.regiao     == null || ong.regiao.length       > 100  ||
                ong.endereco    == undefined || ong.endereco    == '' || ong.endereco   == null || ong.endereco.length     > 200
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultOng = await buscarOng(parseInt(id))

                if(resultOng.status_code == 200){
                    ong.id = parseInt(id)
                    let result = await cadastroOngDAO.updateOng(ong)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultOng.status_code == 400){
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

const excluirOng = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultOng = await buscarOng(parseInt(id))

            if(resultOng.status_code == 200){

                let result = await cadastroOngDAO.deleteOng(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultOng.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarOng = async function(){
    try{
        let dadosOng = {}

        let resultOng = await cadastroOngDAO.selectAllOng()

        if(resultOng != false || typeof(resultOng) == 'object'){
            if(resultOng.length > 0){
                dadosOng.status = true
                dadosOng.status_code = 200
                dadosOng.items = resultOng.length
                dadosOng.ongs = resultOng

                return dadosOng
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


const buscarOng = async function(id){
    try{
        
        let idOng = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosOng = {}

            let resultOng = await cadastroOngDAO.selectByIdOng(parseInt(idOng))

            if(resultOng != false || typeof(resultOng) == 'object'){
                if(resultOng.length > 0){
                    dadosOng.status = true
                    dadosOng.status_code = 200
                    dadosOng.ongs = resultOng

                    return dadosOng
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
    inserirOng,
    atualizarOng,
    buscarOng,
    excluirOng,
    listarOng
}