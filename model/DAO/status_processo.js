/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a status_processo no Banco de dados
 * Data --> 03/06/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir uma vacina no banco de dados
const insertStatusProcesso = async function (statusProcesso){
    try{
        
        let sql = `INSERT INTO tbl_status_processo(status_processo)
    values(
        '${statusProcesso.statusProcesso}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_status_processo WHERE status_processo = '${statusProcesso.statusProcesso}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        
        return false
    }
}

const updateStatusProcesso = async function (statusProcesso){
    try{
        let sql = `UPDATE tbl_status_processo set status_processo = '${statusProcesso.statusProcesso}'
                                                 where id = ${statusProcesso.id}`

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

const deleteStatusProcesso = async function (id){
    try{
        let idStatusProcesso = id

        let sql = `DELETE FROM tbl_status_processo WHERE id=${idStatusProcesso}`

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

const selectAllStatusProcesso = async function (){
    try{
        let sql = `SELECT * FROM tbl_status_processo`

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

const selectByIdStatusProcesso = async function (id){
    try{
        let idStatusProcesso = id

        let sql = `SELECT * FROM tbl_status_processo WHERE id=${idStatusProcesso}`

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
   insertStatusProcesso,
   updateStatusProcesso,
   deleteStatusProcesso,
   selectAllStatusProcesso,
   selectByIdStatusProcesso
}
