# DESAFIO TÉCNICO - BACKEND - Tiago Rebelato

## Passo 1 - Instalação dos pacotes:
~~~nodejs
 npm install
~~~

~~~nodejs
 yarn add
~~~

<hr></hr>

## Passo 2 - Configurações da aplicação:
### O **MySQL** foi a base de dados utilizada. <img src="https://marcas-logos.net/wp-content/uploads/2020/11/MySQL-logo.png" width="45" height="45" />
1. O primeiro passo é criar no MySQL uma conexão, pois a API não foi feito o deploy, e, depois, nessa conexão criar um schema "**database**", não será precio criar nenhuma tabela, pois a própria API já irá criar uma tabela chamada de **Usuario**.
2. O segundo passo é configurar as variáveis da API, para isso é preciso entrar no código da API na pasta **>variaveis** e acessar o arquivo **variaveis.js**. No arquivo **variaveis.js** é preciso preencher os campos  que estão com **'####'** com as configurações da sua conexão MySQL, de modo a informar a **database** que foi você criou. Também é possível alterar a senha do **JWT**, assim como a porta que a API está rodando. 

<hr></hr>

## Passo 3 - Iniciando a aplicação:

~~~nodejs
 npm start
~~~

~~~nodejs
 yarn start
~~~

#### Após iniciar a aplicação, uma tabela chamada **Usuario** será criada na **database** que foi feita anteriormente.

<hr></hr>

## Rotas:
<hr></hr>

### Rotas públicas:

**Método** | **Endpoint** | **Payload** | **Ação**
:---------: | :------ | :-------: | :----:
POST | /cadastro | JSON {**"nome_usuario"**: String Unique Required,  **"senha"**: String Required, **"primeiro_nome"**: String Required, **"ultimo_sobrenome"**: String , **"idade"**: Int} |Cria um novo usuário no banco de dados e retorna um JSON informando que o usuário com o nome "nome_usuario" foi criado com sucesso
POST | /login | JSON {**"nome_usuario"**: String Required, **"senha"**: String Required}|Retorna um JSON com um **"token"** de acesso para o usuário
<hr></hr>

### Rotas privadas:



#### **Header**:
#### Para ter acesso as rotas privadas, é preciso ter um **token** de acesso

 * Content-Type | application/json
 * Authorization | Baerer **token**


**Método** | **Endpoint** | **Payload** | **Ação**
:---------: | :------: | :-------: | :----:
PATCH| /edit/:usuario | JSON {"nome_usuario": String,  "senha": String, "primeiro_nome": String, "ultimo_sobrenome": String , "idade": Int | Altera apenas os dados cadastrais que foram passados no body do usuário que foi passado como parâmetro
