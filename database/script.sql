CREATE DATABASE db_projeto_adocao_pets_bb;
show tables;

show databases;

use db_projeto_adocao_pets_bb;


CREATE TABLE tbl_sexo(
    id int not null primary key auto_increment,
    sexo varchar(45) not null
);


CREATE TABLE tbl_categoria(
	id int not null primary key auto_increment,
    nome_categoria VARCHAR(100)

);


CREATE TABLE tbl_vacina (
	id int not null primary key auto_increment,
    nome_vacina varchar(150)
);

CREATE TABLE tbl_temperamento(
	id int not null primary key auto_increment,
    nome_temperamento varchar(150)

);

CREATE TABLE tbl_status_processo (
	id int not null primary key auto_increment,
    status_processo  varchar(150)
);

CREATE TABLE tbl_status_saude (
	id int not null primary key auto_increment,
	status_saude varchar(150)
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

CREATE TABLE tbl_animal (
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    idade varchar(25) not null,
    raca varchar(200) ,
    especie varchar(250) not null,
    foto varchar(10000) not null,
    localizacao varchar(250) not null,
    celular_responsavel varchar(20) not null,
    id_status_processo int not null,
    id_temperamento int not null,
    id_vacina int not null,
    id_status_saude int not null,
    id_usuario int not null,
    id_sexo int not null,

	FOREIGN KEY (id_status_processo) REFERENCES tbl_status_processo(id),
    FOREIGN KEY (id_temperamento) REFERENCES tbl_temperamento(id),
    FOREIGN KEY (id_vacina) REFERENCES tbl_vacina(id),
    FOREIGN KEY (id_status_saude) REFERENCES tbl_status_saude(id),
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_sexo) REFERENCES tbl_sexo(id)
    

);





SHOW TABLES;

SHOW COLUMNS FROM tbl_animal;
