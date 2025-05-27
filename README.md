#  🐾 API de Adoção de Pets
## 📌 Informações Gerais

- **Objetivo:** API destinada ao gerenciamento de cadastros de tutores e ONGs no sistema de adoção de pets.

---


## ⚙️ Instalação e Configuração
## 📦 Dependências do Projeto

Execute os seguintes comandos para instalar as bibliotecas necessárias:

```bash
npm install express --save
npm install cors --save
npm install body-parser --save

🗃️ Integração com o Banco de Dados (Prisma)

Instale as bibliotecas do Prisma:


npm install prisma --save
npm install @prisma/client --save

# Inicialize o Prisma no projeto:


npx prisma init

# Execute a migração para sincronizar com o banco de dados:

npx prisma migrate dev

Observação: Os métodos POST e PUT exigem o uso de bodyParser.json() para que os dados no corpo da requisição sejam processados corretamente.

```
# 🚀 Endpoints da API
## 🔗 Base URL -->  /v1/controle-pet


## 👤 Endpoints - Cadastro de Usuario

| Método | Endpoint     | Descrição                 |
| ------ | ------------ | ------------------------- |
| POST   | `/usuario`     | Cadastrar um novo usuario   |
| GET    | `/usuario`     | Listar todos os usuarios   |
| GET    | `/usuario/:id` | Buscar um usuario por ID    |
| PUT    | `/usuario/:id` | Atualizar um usuario por ID |
| DELETE | `/usuario/:id` | Remover um usuario por ID   |


### 📥 Exemplo de Payload para POST/PUT
{ <br>
    "nome": "Israel Junior", <br>
    "id_categoria": 1, <br>
    "email": "raraeldev@gmail.com", <br>
    "endereco": "rua andorra 472", <br>
    "cnpj": "", <br>
    "senha": "rael123", <br>
    "data_nascimento": "2007-06-13", <br>
    "cpf": "396.336.902-07" <br>
}


## 🏢 Endpoints - Cadastro de categoria
| Método | Endpoint   | Descrição                |
| ------ | ---------- | ------------------------ |
| POST   | `/categoria`     | Cadastrar uma nova categoria   |
| GET    | `/categoria`     | Listar todas as categorias     |
| GET    | `/categoria/:id` | Buscar uma categoria por ID    |
| PUT    | `/categoria/:id` | Atualizar uma categoria por ID |
| DELETE | `/categoria/:id` | Remover uma categoria por ID   |


### 📥 Exemplo de Payload para POST/PUT

{ <br>
  "nome_categoria": "TUTOR", <br>
} <br>

# 📋 Considerações Finais
### Os métodos POST e PUT devem conter o cabeçalho:



A API está configurada com CORS para aceitar requisições de diferentes origens.


