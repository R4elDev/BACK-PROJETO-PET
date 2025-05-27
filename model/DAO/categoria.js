/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a categoria no BANCO DE DADOSs
 * Data --> 20/05/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()


const inserCategoria = async function (categoria){
    try{
        let sql = `INSERT INTO tbl_categoria(nome_categoria)
    values(
        '${categoria.nome_categoria}'
    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch (error){
        return false
    }
}

const updateCategoria = async function (categoria){
    try{
        let sql = `UPDATE tbl_categoria set nome_categoria = '${categoria.nome_categoria}'
                                                 where id = ${categoria.id}`

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

const deleteCategoria = async function (id){
    try{
        let idCategoria = id

        let sql = `DELETE FROM tbl_categoria WHERE id=${idCategoria}`

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

const selectAllCategoria = async function (){
    try{
        let sql = `SELECT * FROM tbl_categoria`

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

const selectByIdCategoria = async function (id){
    try{
        let idCategoria = id

        let sql = `SELECT * FROM tbl_categoria WHERE id=${idCategoria}`

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
    inserCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategoria,
    selectByIdCategoria
}
