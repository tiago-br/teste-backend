const mysql = require('mysql2');
const {configConexao} = require('../variaveis/variaveis')
const conexao = mysql.createConnection(configConexao);

module.exports = conexao;