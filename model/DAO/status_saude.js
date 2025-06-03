/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a status_saude no Banco de dados
 * Data --> 03/06/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir uma vacina no banco de dados
const insertStatusSaude = async function (statusSaude){
    try{
        
        let sql = `INSERT INTO tbl_status_saude(status_saude)
    values(
        '${statusSaude.status_saude}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_status_saude WHERE status_saude = '${statusSaude.status_saude}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        
        return false
    }
}

const updateStatusSaude = async function (statusSaude){
    try{
        let sql = `UPDATE tbl_status_saude set status_processo = '${statusSaude.status_saude}'
                                                 where id = ${statusSaude.id}`

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

const deleteStatusSaude = async function (id){
    try{
        let idStatusSaude = id

        let sql = `DELETE FROM tbl_status_saude WHERE id=${idStatusSaude}`

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

const selectAllStatusSaude = async function (){
    try{
        let sql = `SELECT * FROM tbl_status_saude`

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

const selectByIdStatusSaude = async function (id){
    try{
        let idStatusSaude = id

        let sql = `SELECT * FROM tbl_status_saude WHERE id=${idStatusSaude}`

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
   insertStatusSaude,
   updateStatusSaude,
   deleteStatusSaude,
   selectAllStatusSaude,
   selectByIdStatusSaude
}
