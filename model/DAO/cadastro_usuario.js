/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a cadastro_usuario no BANCO DE DADOS
 * Data --> 20/05/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir um tutor no banco de dados
const insertUsuario = async function (usuario){
    try{
        
        let sql = `INSERT INTO tbl_usuario(nome,id_categoria,email,endereco,cnpj,senha,data_nascimento,cpf)
    values(
        '${usuario.nome}',
        '${usuario.id_categoria}',
        '${usuario.email}',
        '${usuario.endereco}',
        '${usuario.cnpj}',
        '${usuario.senha}',
        ${usuario.data_nascimento ? `'${usuario.data_nascimento}'` : null},
        '${usuario.cpf}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_usuario WHERE email = '${usuario.email}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        console.log(error)
        return false
    }
}

const updateUsuario = async function (usuario){
    try{
        let sql = `UPDATE tbl_usuario set nome = '${usuario.nome}',
                                                 id_categoria = '${usuario.id_categoria}',
                                                 email = '${usuario.email}'
                                                 endereco = '${usuario.endereco}',
                                                 cnpj = '${usuario.cnpj}',
                                                 senha = '${usuario.senha}',
                                                 data_nascimento = ${usuario.data_nascimento},
                                                 cpf = '${usuario.cpf}'
                                                 where id = ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const deleteUsuario = async function (id){
    try{
        let idUsuario = id

        let sql = `DELETE FROM tbl_usuario WHERE id=${idUsuario}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectAllUsuario = async function (){
    try{
        let sql = `SELECT * FROM tbl_usuario`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return falses
        }

    }catch(error){
        console.log(error)
        return false
    }
}

const selectByIdUsuario = async function (id){
    try{
        let idUsuario = id

        let sql = `SELECT * FROM tbl_usuario WHERE id=${idUsuario}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectLoginUsuario = async function (email) {
    try{
        const sql = `SELECT * from tbl_usuario WHERE email = '${email}'`

        const result = await prisma.$queryRawUnsafe(sql)
        
        if(result.length > 0){
            return result[0]
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario,
    selectLoginUsuario
}
