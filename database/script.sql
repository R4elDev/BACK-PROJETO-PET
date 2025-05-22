CREATE DATABASE db_projeto_adocao_pets_bb;
show databases;

use db_projeto_adocao_pets_bb;

CREATE TABLE tbl_cadastro_tutor(
	id int not null primary key auto_increment,
	nome VARCHAR(100) not null,
    email VARCHAR(150) not null,
    endereco VARCHAR(200) not null,
    cnpj VARCHAR(45) not null,
    senha VARCHAR(45) not null,
    data_nascimento DATE not null
);

CREATE TABLE tbl_cadastro_ong(
	id int not null primary key auto_increment,
    nome VARCHAR(100),
    email VARCHAR(150) not null,
    regiao VARCHAR(100) not null,
    endereco VARCHAR(200) not null
);
