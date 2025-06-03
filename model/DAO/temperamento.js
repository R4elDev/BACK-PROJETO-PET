/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a temperamento no Banco de dados
 * Data --> 03/06/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir uma vacina no banco de dados
const insertTemperamento = async function (temperamento){
    try{
        
        let sql = `INSERT INTO tbl_temperamento(nome_temperamento)
    values(
        '${temperamento.nome_temperamento}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_temperamento WHERE nome_temperamento = '${temperamento.nome_temperamento}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        
        return false
    }
}

const updateTemperamento = async function (temperamento){
    try{
        let sql = `UPDATE tbl_temperamento set nome = '${temperamento.nome_temperamento}'
                                                 where id = ${temperamento.id}`

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

const deleteTemperamento = async function (id){
    try{
        let idTemperamento = id

        let sql = `DELETE FROM tbl_temperamento WHERE id=${idTemperamento}`

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

const selectAllTemperamento = async function (){
    try{
        let sql = `SELECT * FROM tbl_temperamento`

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

const selectByIdTemperamento= async function (id){
    try{
        let idTemperamento = id

        let sql = `SELECT * FROM tbl_temperamento WHERE id=${idTemperamento}`

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
   insertTemperamento,
   updateTemperamento,
   selectAllTemperamento,
   selectByIdTemperamento,
   deleteTemperamento
}
