/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a sexo no Banco de dados
 * Data --> 12/06/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Função para inserir uma vacina no banco de dados
const insertSexo = async function (sexo){
    try{
        
        let sql = `INSERT INTO tbl_sexo(sexo)
    values(
        '${sexo.sexo}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelect = `SELECT * FROM tbl_sexo WHERE sexo = '${sexo.sexo}' ORDER BY id DESC LIMIT 1`

            let scriptCriado = await prisma.$queryRawUnsafe(sqlSelect)
            return scriptCriado[0]
        }else{
            return false
        }
    }catch (error){
        
        return false
    }
}

const updateSexo = async function (sexo){
    try{
        let sql = `UPDATE tbl_sexo set sexo = '${sexo.sexo}'
                                                 where id = ${sexo.id}`

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

const deleteSexo = async function (id){
    try{
        let idSexo = id

        let sql = `DELETE FROM tbl_sexo WHERE id=${idSexo}`

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

const selectAllSexo = async function (){
    try{
        let sql = `SELECT * FROM tbl_sexo`

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

const selectByIdSexo = async function (id){
    try{
        let idSexo = id

        let sql = `SELECT * FROM tbl_sexo WHERE id=${idSexo}`

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
   insertSexo,
   updateSexo,
   deleteSexo,
   selectByIdSexo,
   selectAllSexo
}
