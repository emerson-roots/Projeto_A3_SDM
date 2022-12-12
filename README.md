
# Sobre o projeto:
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/emerson-roots/A3_SDM/blob/master/LICENSE)
 ![NPM](https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E) ![NPM](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![NPM](https://img.shields.io/badge/JSON-5E5C5C?style=flat&logo=json&logoColor=white) ![NPM](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white) ![NPM](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
 
 
#### Este projeto faz parte da avaliação A3 para o curso de ADS (Análise e desenvolvimento de sistemas) da Universidade São Judas - campus Unimonte.
- Professor Marcelo Amorim/Elienai;
- UC: Sistemas distribuídos e mobile;
##### Os requisitos são;

* Desenvolver uma API em formato de quiz que responda aos métodos HTTP mais comuns (GET, POST, PUT, DELETE);
* A API deve ter autenticação/autorização para acessar determinados endpoints;


# Tecnologias utilizadas:


### BACKEND
-	Javascript;
-	Node.js;
-	Padrão API Rest;
-	Banco de dados lowdb (JSON File);



### Como executar o projeto LOCALMENTE

***Pré-requisitos:***
- node.js version 16.17.1 (ou superior)
- npm version 8.15.0 (ou superior)


```bash
# na linha de comando, clonar repositório
git clone https://github.com/emerson-roots/Projeto_A3_SDM

# entrar na pasta do projeto clonado

# fazer install das dependências node_modules através do comando (aguarde o download e instalação):
npm install

# instale o nodemon através do comando;
npm install nodemon -g

# iniciar a aplicação através do comando:
npm run server

# se o comando anterior não abrir o navegador automaticamente, 
# teste a aplicação através da URL (lembre-se de confirmar a porta padrão da sua máquina):
http://localhost:3000/ 


# pausar/stopar aplicação
CTRL+C na linha de comando

# para iniciar a apicação em modo debug (talvez seja necessário configurar um arquivo launch.json)
nodemon --inspect ./src/server.js
```

## Endpoints e dados para requisições HTTP: 
- Alguns endpoints desta API requer um token JWT para poder autênticar/autorizar a requisição HTTP
- Faça uma requisição para o endpoint "auth/getToken" abaixo para recuperar o token e insira no cabeçalho "Authorization" do seu client (Postman ou Thunder client) para prosseguir nestas requisições protegidas;

##### ***POST*** - Retorna um Token JWT
###### http://localhost:3000/auth/getToken
``` bash
{
    "username": "emerson",
    "password": "ejcf-a3"
}
```
***
##### ***GET*** - Retorna todas as questões do quiz
###### http://localhost:3000/questoes
***
##### ***GET*** - Retorna uma questão do quiz de acordo com o parametro ID *(Requer Token de Autenticação)*
###### http://localhost:3000/questoes/:id
***
##### ***DELETE*** - Deleta uma questão do quiz de acordo com o parametro ID *(Requer Token de Autenticação)*
###### http://localhost:3000/questoes/:id
***
##### ***POST*** - Insere uma nova questão do quiz *(Requer Token de Autenticação)*
###### http://localhost:3000/questoes
``` bash
{
    "question": "How to delete a directory in Linux???",
    "description": "delete folder",
    "answers": {
        "answer_a": "ls",
        "answer_b": "delete",
        "answer_c": "remove",
        "answer_d": "rmdir",
        "answer_e": ""
    },
    "correct_answers": {
        "answer_a_correct": "false",
        "answer_b_correct": "false",
        "answer_c_correct": "false",
        "answer_d_correct": "true",
        "answer_e_correct": "false"
    },
    "explanation": "rmdir deletes an empty directory",
    "tip": null,
    "tags": [],
    "category": "linux",
    "difficulty": "Easy",
    "theme": "INFRAESTRUTURA"
}
```
***
##### ***PUT*** - Edita uma questão do quiz de acordo com o parametro ID *(Requer Token de Autenticação)*
###### http://localhost:3000/questoes/:id
``` bash
{
    "id": "",
    "question": "How to delete a directory in Linux???",
    "description": "delete folder",
    "answers": {
        "answer_a": "ls",
        "answer_b": "delete",
        "answer_c": "remove",
        "answer_d": "rmdir",
        "answer_e": ""
    },
    "correct_answers": {
        "answer_a_correct": "false",
        "answer_b_correct": "false",
        "answer_c_correct": "false",
        "answer_d_correct": "true",
        "answer_e_correct": "false"
    },
    "explanation": "rmdir deletes an empty directory",
    "tip": null,
    "tags": [],
    "category": "linux",
    "difficulty": "Easy",
    "theme": "INFRAESTRUTURA"
}
```
***
##### ***POST*** - Verifica se a resposta está correta de acordo com o ID da pergunta
###### http://localhost:3000/questoes/verifica_resposta/:id
``` bash
{
    "answer_a_correct": "true",
    "answer_b_correct": "false",
    "answer_c_correct": "true",
    "answer_d_correct": "false",
    "answer_e_correct": "false"
}
```
***

# 🚀 Autores

- *Emerson Melo de Lima*
- *João Pedro de Paula Barros*
- *Carla Cristina Faria de Almeida*
- *Fabrício Santos Fagundes*

