/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a cadastro_tutor no BANCO DE DADOS
 * Data --> 20/05/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir um tutor no banco de dados
const insertOng = async function (ong){
    try{
        let sql = `INSERT INTO tbl_cadastro_ong(nome,email,regiao,endereco)
    values(
        '${ong.nome}',
        '${ong.email}',
        '${ong.regiao}',
        '${ong.endereco}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_cadastro_ong WHERE nome = '${ong.nome}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        return false
    }
}

const updateOng = async function (ong){
    try{
        let sql = `UPDATE tbl_cadastro_ong set nome = '${ong.nome}',
                                                 email = '${ong.email}',
                                                 regiao = '${ong.regiao}',
                                                 endereco = '${ong.endereco}'
                                                 where id = ${ong.id}`

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

const deleteOng = async function (id){
    try{
        let idOng = id

        let sql = `DELETE FROM tbl_cadastro_ong WHERE id=${idOng}`

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

const selectAllOng = async function (){
    try{
        let sql = `SELECT * FROM tbl_cadastro_ong`

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

const selectByIdOng = async function (id){
    try{
        let idOng = id

        let sql = `SELECT * FROM tbl_cadastro_ong WHERE id=${idOng}`

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
    insertOng,
    updateOng,
    selectAllOng,
    selectByIdOng,
    deleteOng
}
