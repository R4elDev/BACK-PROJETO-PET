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


## 👤 Endpoints - Cadastro de Tutor

| Método | Endpoint     | Descrição                 |
| ------ | ------------ | ------------------------- |
| POST   | `/tutor`     | Cadastrar um novo tutor   |
| GET    | `/tutor`     | Listar todos os tutores   |
| GET    | `/tutor/:id` | Buscar um tutor por ID    |
| PUT    | `/tutor/:id` | Atualizar um tutor por ID |
| DELETE | `/tutor/:id` | Remover um tutor por ID   |


### 📥 Exemplo de Payload para POST/PUT
{ <br>
  "nome": "João da Silva", <br>
  "email": "joao@email.com", <br>
  "telefone": "(11) 99999-9999" <br>
}


## 🏢 Endpoints - Cadastro de ONG
| Método | Endpoint   | Descrição                |
| ------ | ---------- | ------------------------ |
| POST   | `/ong`     | Cadastrar uma nova ONG   |
| GET    | `/ong`     | Listar todas as ONGs     |
| GET    | `/ong/:id` | Buscar uma ONG por ID    |
| PUT    | `/ong/:id` | Atualizar uma ONG por ID |
| DELETE | `/ong/:id` | Remover uma ONG por ID   |


### 📥 Exemplo de Payload para POST/PUT

{ <br>
  "nome": "ONG Amigos dos Animais", <br>
  "email": "contato@amigosanimais.org", <br>
  "telefone": "(21) 88888-8888", <br>
  "endereco": "Rua dos Bichos, 123" <br>
} <br>

# 📋 Considerações Finais
### Os métodos POST e PUT devem conter o cabeçalho:



A API está configurada com CORS para aceitar requisições de diferentes origens.


