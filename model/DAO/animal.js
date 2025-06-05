/*****************************************************************************************
 * Objetivo --> Model responsavel pelo CRUD de dados referente a ANIMAL no BANCO DE DADOS
 * Data --> 04/06/2025
 * Autor --> Israel
 * Versão --> 1.0
 ****************************************************************************************/

// Import da biblioteca do PRISMA/CLIENT para executar scripts no Banco de Dados
const { PrismaClient } = require('@prisma/client')


//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

// Função para inserir no Banco De Dados um novo animal
const insertAnimal = async function (animal) {

    try {
        let sql = `insert into tbl_animal(nome,idade,sexo,raca,especie,foto,localizacao,celular_responsavel,id_status_processo,id_temperamento,id_vacina,id_status_saude)
    values(
        '${animal.nome}',
        '${animal.idade}',
        '${animal.sexo}',
        '${animal.raca}',
        '${animal.especie}',
        '${animal.foto}',
        '${animal.localizacao}',
        '${animal.celular_responsavel}',
        '${animal.id_status_processo}',
        '${animal.id_temperamento}',
        '${animal.id_vacina}',
        '${animal.id_status_saude}'
    );`

        // Executa o script SQL no BD e AGUARDA O retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_animal WHERE nome = '${animal.nome}' ORDER BY id DESC LIMIT 1` 
            let criado = await prisma.$queryRawUnsafe(sqlSelect) 
            return criado[0] 
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// Função para atualizar no Banco De Dados um Animal existente
const updateAnimal = async function (animal) {
    try{
        let sql = `update tbl_animal set nome = '${animal.nome}', 
                                         idade = '${animal.idade}',
                                         sexo = '${animal.sexo}', 
                                         raca = '${animal.raca}', 
                                         especie = '${animal.especie}', 
                                         foto = '${animal.foto}', 
                                         localizacao = '${animal.localizacao}' ,
                                         celular_responsavel = '${animal.celular_responsavel}' ,
                                         id_status_processo = '${animal.id_status_processo}',
                                         id_temperamento = '${animal.id_temperamento}',
                                         id_vacina = '${animal.id_vacina}',
                                         id_status_saude = '${animal.id_status_saude}'
                                         where id = ${animal.id}`

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

// Função para excluir no Banco De Dados um Animal existente
const deleteAnimal = async function (id) {
    try{
        let idAnimal = id
        let sql = `delete from tbl_animal where id=${idAnimal}`

        let result = await prisma.$executeRawUnsafe(sql) // execute por que não retorna conteudo do banco

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

// Função para retornar do Banco De Dados uma lista de Animal
const selectAllAnimal = async function () {
    try{

        // Script SQL para retornar os dados do BD
        let sql = `select * from tbl_animal`

        // Executa o script SQL e aguarda o retorno dos dados
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

// Função para buscar no Banco de Dados um Animal pelo ID
const selectByIdAnimal = async function (id) {
    
    try{
        let idAnimal = id
        let sql = `select * from tbl_jogo where id=${idAnimal}`

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
    insertAnimal,
    updateAnimal,
    deleteAnimal,
    selectAllAnimal,
    selectByIdAnimal
}