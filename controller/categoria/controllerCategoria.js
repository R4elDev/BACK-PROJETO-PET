/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da cadastro Tutor
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const categoriaDAO = require('../../model/DAO/categoria.js')

const inserirCategoria = async function (categoria, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            categoria.nome_categoria      == undefined || categoria.nome_categoria.length > 100 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultCategoria = await categoriaDAO.inserCategoria(categoria)
                if(resultCategoria){
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

const atualizarCategoria = async function(categoria,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                              == undefined || id                              == '' || id             == null || isNaN(id) || id         <= 0   ||
                categoria.nome_categoria        == undefined ||  categoria.nome_categoria.length         > 100  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultCategoria = await buscarCategoria(parseInt(id))

                if(resultCategoria.status_code == 200){
                    categoria.id = parseInt(id)
                    let result = await categoriaDAO.updateCategoria(categoria)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultCategoria.status_code == 400){
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

const excluirCategoria = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultCategoria = await buscarCategoria(parseInt(id))

            if(resultCategoria.status_code == 200){

                let result = await categoriaDAO.deleteCategoria(parseInt(id))

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

const listarCategoria = async function(){
    try{
        let dadosCategoria = {}

        let resultCategoria = await categoriaDAO.selectAllCategoria()

        if(resultCategoria != false || typeof(resultCategoria) == 'object'){
            if(resultCategoria.length > 0){
                dadosCategoria.status = true
                dadosCategoria.status_code = 200
                dadosCategoria.items = resultCategoria.length
                dadosCategoria.categorias = resultCategoria

                return dadosCategoria
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


const buscarCategoria = async function(id){
    try{
        
        let idCategoria = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosCategoria = {}

            let resultCategoria = await categoriaDAO.selectByIdCategoria(parseInt(idCategoria))

            if(resultCategoria != false || typeof(resultCategoria) == 'object'){
                if(resultCategoria.length > 0){
                    dadosCategoria.status = true
                    dadosCategoria.status_code = 200
                    dadosCategoria.categoria = resultCategoria

                    return dadosCategoria
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
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarCategoria,
    buscarCategoria
}