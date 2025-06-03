/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a vacina no Banco de dados
 * Data --> 03/06/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir uma vacina no banco de dados
const insertVacina = async function (vacina){
    try{
        
        let sql = `INSERT INTO tbl_vacina(nome_vacina)
    values(
        '${vacina.nome_vacina}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_vacina WHERE nome_vacina = '${vacina.nome_vacina}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        
        return false
    }
}

const updateVacina = async function (vacina){
    try{
        let sql = `UPDATE tbl_vacina set nome_temperamento = '${vacina.nome_vacina}'
                                                 where id = ${vacina.id}`

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

const deleteVacina = async function (id){
    try{
        let idVacina = id

        let sql = `DELETE FROM tbl_vacina WHERE id=${idVacina}`

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

const selectAllVacina = async function (){
    try{
        let sql = `SELECT * FROM tbl_vacina`

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

const selectByIdVacina = async function (id){
    try{
        let idVacina = id

        let sql = `SELECT * FROM tbl_vacina WHERE id=${idVacina}`

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
    insertVacina,
    updateVacina,
    selectAllVacina,
    selectByIdVacina,
    deleteVacina
}
