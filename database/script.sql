CREATE DATABASE db_projeto_adocao_pets_bb;
show databases;

use db_projeto_adocao_pets_bb;

show tables;

drop table tbl_cadastro_ong;


CREATE TABLE tbl_categoria(
	id int not null primary key auto_increment,
    nome_categoria VARCHAR(100)

);

CREATE TABLE tbl_usuario(
	id int not null primary key auto_increment,
	nome VARCHAR(100) not null,
    id_categoria int not null,
    email VARCHAR(150) not null,
    endereco VARCHAR(200),
    cnpj VARCHAR(45),
    senha VARCHAR(45) not null,
    data_nascimento DATE,
    cpf VARCHAR(20),
    
    FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id)
);














