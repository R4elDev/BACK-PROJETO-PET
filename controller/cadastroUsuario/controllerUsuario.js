/**************************************************************************
 * Objetivo ==> Controller responsável pela regra de negócio do CRUD da cadastro Tutor
 * Data ==> 20/05/2025
 * Autor ==> Israel
 * Versão ==> 1.0
 ****************************************************************************/

const MESSAGE = require('../../modulo/config.js')

const cadastroUsuarioDAO = require('../../model/DAO/cadastro_usuario.js')

// IMPORT DAS CONTROLLERES PARA CRIAR AS RELAÇOES COM O USUARIO
const controllerCategoria = require('../categoria/controllerCategoria.js')

const inserirUsuario = async function (usuario, contentType) {
    try{
        if(contentType == 'application/json'){
            if(
            usuario.nome             == undefined || usuario.nome                             == '' || usuario.nome     == null || usuario.nome.length     > 100 ||
            usuario.id_categoria     == undefined || usuario.id_categoria                     == '' ||
            usuario.email            == undefined || usuario.email                            == '' || usuario.email    == null || usuario.email.length    > 150 ||
            usuario.endereco         == undefined || usuario.endereco.length > 200 ||
            usuario.cnpj             == undefined ||  usuario.cnpj.length            > 100 ||
            usuario.senha            == undefined || usuario.senha                            == '' || usuario.senha    == null || usuario.senha.length    > 100 ||
            usuario.data_nascimento  == undefined ||  usuario.data_nascimento.length > 100 ||
            usuario.cpf              == undefined ||  usuario.cpf.length             > 100 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{

                if(usuario.data_nascimento == '' || usuario.data_nascimento == 0){
                    usuario.data_nascimento = null
                }

                let resultUsuario = await cadastroUsuarioDAO.insertUsuario(usuario)
                if(resultUsuario){
                    const usuarioBuscado = await buscarUsuario(resultUsuario.id)
                    return {
                        message: MESSAGE.SUCCESS_CREATED_ITEM,
                        usuarioBuscado
                    };


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

const atualizarUsuario = async function(usuario,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id              == undefined || id             == '' || id             == null || isNaN(id) || id      <= 0   ||
                usuario.nome             == undefined || usuario.nome                             == '' || usuario.nome     == null || usuario.nome.length     > 100 ||
                usuario.id_categoria     == undefined || usuario.id_categoria                     == '' ||
                usuario.email            == undefined || usuario.email                            == '' || usuario.email    == null || usuario.email.length    > 150 ||
                usuario.endereco         == undefined || usuario.endereco                         == '' || usuario.endereco == null || usuario.endereco.length > 200 ||
                usuario.cnpj             == undefined ||  usuario.cnpj.length            > 100 ||
                usuario.senha            == undefined || usuario.senha                            == '' || usuario.senha    == null || usuario.senha.length    > 100 ||
                usuario.data_nascimento  == undefined ||  usuario.data_nascimento.length > 100 ||
                usuario.cpf              == undefined ||  usuario.cpf.length             > 100 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                
                let resultUsuario = await buscarUsuario(parseInt(id))

                if(resultUsuario.status_code == 200){
                    usuario.id = parseInt(id)
                    let result = await cadastroUsuarioDAO.updateUsuario(usuario)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultUsuario.status_code == 400){
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

const excluirUsuario = async function (id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultUsuario = await buscarUsuario(parseInt(id))

            if(resultUsuario.status_code == 200){

                let result = await cadastroUsuarioDAO.deleteUsuario(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultUsuario.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarUsuario = async function(){
    try{

        const arrayUsuarios = []

        let dadosUsuario = {}

        let resultUsuario = await cadastroUsuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuario.length
                
                for(itemUsuario of resultUsuario){
                    let dadosCategorias = await controllerCategoria.buscarCategoria(itemUsuario.id_categoria)

                    itemUsuario.categorias = dadosCategorias.categoria

                    delete itemUsuario.id_categoria

                    arrayUsuarios.push(itemUsuario)
                }

                dadosUsuario.usuarios = arrayUsuarios

                return dadosUsuario
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


const buscarUsuario = async function(id){
    try{
        
        let arrayUsuarios = []
        let idUsuario = id

        if(id == '' || id == undefined || id == null || id == isNaN(id || id <= 0)){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosUsuarios = {}

            let resultUsuarios = await cadastroUsuarioDAO.selectByIdUsuario(parseInt(idUsuario))

            if(resultUsuarios != false || typeof(resultUsuarios) == 'object'){
                if(resultUsuarios.length > 0){
                    dadosUsuarios.status = true
                    dadosUsuarios.status_code = 200
                    
                    for(itemUser of resultUsuarios){
                        let dadosCategorias = await controllerCategoria.buscarCategoria(itemUser.id_categoria)

                        itemUser.categorias = dadosCategorias.categoria

                        delete itemUser.id_categoria

                        arrayUsuarios.push(itemUser)
                    }

                    dadosUsuarios.usuarios = arrayUsuarios

                    return dadosUsuarios
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

const loginUsuario = async function(email,senha,contentType){
    try{
        
        if(contentType == 'application/json'){
            if(
                email  == undefined || email        == '' || email    == null || email.length    > 150 ||
                senha  == undefined || senha        == '' || senha    == null || senha.length    >  45
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultUsuario = await cadastroUsuarioDAO.selectLoginUsuario(email)
    
                if(!resultUsuario || resultUsuario.senha !== senha){
                    return MESSAGE.ERROR_UNAUTHORIZED
                }else{
                    return {
                        message: MESSAGE.SUCCESS_CREATED_ITEM,
                        resultUsuario
                    };
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario,
    loginUsuario
}