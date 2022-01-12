const express = require('express');
const cors = require('cors');

const conexao = require('./config/conexao');
const TabelaUsuario = require('./config/TabelaUsuario');
const RotasPublicas = require('./routes/publica.rotas');
const RotasPrivadas = require('./routes/privadas.rotas')
const authMiddleware = require('./middleware/auth.middleware');
const {PORT} = require('./variaveis/variaveis');

const app = express();

app.use(cors());
app.use(express.json());

//Rota Públicas
app.use('/', RotasPublicas);

//Rotas Privadas
app.use('/', authMiddleware ,RotasPrivadas);


conexao.connect(erro=>{
    if(erro){
        console.log(erro);
    }else{
        TabelaUsuario.init(conexao);
        app.listen(PORT, ()=>{console.log(`Rodando na porta: ${PORT}`)});
    }
});


