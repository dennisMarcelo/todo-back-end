<h1 align="center"> Back-end To-Do list </h1>

## Arquitetura utilizada: mvc

## Para rodar localmente é preciso instalar as seguintes tecnologias: 
- MongoDB
  - [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) para baixar no windows
  - [link](https://docs.mongodb.com/manual/administration/install-on-linux/) para baixar no linux
  - [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) para baixar no Mac
- NPM (Node)
  - [link](https://nodejs.org/en/download/) para baixar Node e NPM


## Para baixar as dependencias e devDependencies:
 - `$npm i`

## Como executar
- Inicie o projeto utilizando `$npm start`
- Ou inicie o projeto em modo de desenvolvimento utilizando `$npm run start:dev`

## Tests
 - Para rodar os test unitários: `$npm run test:unit`
 - Para rodar os test de integração: `$npm run test:integration`
 - <span style="color: red"> **Atenção:** </span> Atualmento **somente** o teste unitário do userModel esta pronto

## Organização das pastas:
    Projeto todo-list
    ├── public
    ├── src
    │   ├── Controller
    │   │    ├── userController.js
    │   │    └── toDoController.js
    │   ├── Model
    │   │    ├── userModel.js
    │   │    └── toDoModel.js
    │   ├── Services
    │   │    ├── userService.js
    │   │    └── toDoService.js
    │   ├── Tests
    │   │    ├── integrationTests (testes de integração)
    │   │    │   ├── userModel.test.js
    │   │    │   ├── userService.test.js
    │   │    │   ├── userController.test.js
    │   │    │   ├── toDoModel.test.js
    │   │    │   ├── toDoService.test.js
    │   │    │   └── toDoController.test.js
    │   │    └── unitTests (testes de unitários)
    │   │        ├── user.test.js
    │   │        └── toDo.test.js
    │   ├── Helpers
    │   └── Middlewares
    │
    └── Index

## Estrutura dos dados no banco:
- users: 
  ```
    [
      { id, name, email, password, userIsValid }  
    ]
  ```
- todos: 
  ```
    [
      { id, userId, toDo, toDoStatus, creationDate }   
    ]
  ```
## rotas:
- POST  **/user**
    - Rota para cria novo usuário;
    - Depois de cadastrar é gerado um token;
    - Json esperado: 
    ```
      {
        "name": "string",
        "email": "email",
        "password": "string"
      }
    ```

- POST **/user/login**
    - Rota de login
    - Depois de logado é gerado um token
    - Json esperado: 
    ```
      {
        "email": "email",
        "password": "string"
      }
    ```
- GET  **/todo**
    - Para acessar a rota é preciso ter um  <span style="color: red"> **token** </span>
    - Rota para obter todas tarefas
    - Retorna um array de objetos com informaçẽos de todos as tarefas

- POST **/todo**
    - Para acessar a rota é preciso ter um  <span style="color: red"> **token** </span>
    - Rota para criar nova tarefas 
    - Retorn um objeto com informações da nova tarefa criada
    - Json esperado: 
    ```
      {
        "toDo":"string", 
        "toDoStatus": "string" 
      }
    ```

- PUT **/todo**
    - Para acessar a rota é preciso ter um  <span style="color: red"> **token** </span>
    - Rota para atualizar tarefa 
    - Retorn um objeto com informações da nova tarefa atualizada
    - Json esperado: 
    ```
      {
        "_id": "ID",
        "userId": "ID",
        "toDo": "string",
        "toDoStatus": "string"
      }
    ```
- DELETE **/todo/:id**
    - Para acessar a rota é preciso ter um  <span style="color: red"> **token** </span>
    - Rota para deletar tarefa
    - Retorna informações da tarefa removida
    - É esperado um id com 24 caracters

