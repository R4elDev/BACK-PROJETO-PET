/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a cadastro_tutor no BANCO DE DADOS
 * Data --> 20/05/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir um tutor no banco de dados
const insertTutor = async function (tutor){
    try{
        let sql = `INSERT INTO tbl_cadastro_tutor(nome,email,endereco,cnpj,senha,data_nascimento)
    values(
        '${tutor.nome}',
        '${tutor.email}',
        '${tutor.endereco}',
        '${tutor.cnpj}',
        '${tutor.senha}',
        '${tutor.data_nascimento}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_cadastro_tutor WHERE nome = '${tutor.nome}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        return false
    }
}

const updateTutor = async function (tutor){
    try{
        let sql = `UPDATE tbl_cadastro_tutor set nome = '${tutor.nome}',
                                                 email = '${tutor.email}',
                                                 endereco = '${tutor.endereco}',
                                                 cnpj = '${tutor.cnpj}',
                                                 senha = '${tutor.senha}',
                                                 data_nascimento = '${tutor.data_nascimento}'
                                                 where id = ${tutor.id}`

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

const deleteTutor = async function (id){
    try{
        let idTutor = id

        let sql = `DELETE FROM tbl_cadastro_tutor WHERE id=${idTutor}`

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

const selectAllTutor = async function (){
    try{
        let sql = `SELECT * FROM tbl_cadastro_tutor`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return falses
        }

    }catch(error){
        return false
    }
}

const selectByIdTutor = async function (id){
    try{
        let idTutor = id

        let sql = `SELECT * FROM tbl_cadastro_tutor WHERE id=${idTutor}`

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

module.exports = {
    insertTutor,
    updateTutor,
    deleteTutor,
    selectAllTutor,
    selectByIdTutor
}
