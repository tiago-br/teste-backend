const conexao = require('../config/conexao');
const jwt = require('jsonwebtoken');
const {senhaJWT} = require('../variaveis/variaveis');
const bcrypt = require('bcryptjs');

class Usuario{
    novoUsuario = async(usuario, res)=>{
        const sql = `INSERT INTO Usuario SET ?`
        
        const validarUsuario = usuario.nome_usuario.length < 5 || usuario.nome_usuario.length > 20;
        const validarSenha = usuario.senha.length <  6 || usuario.senha.length > 12;
        const erros = [
            {   
                erro:"Usuário",
                success:!validarUsuario,
                msg:"O nome do usuário deve conter pelo menos 6 caracteres e menos de 20",
            },
            {   
                erro:"Senha",
                success:!validarSenha,
                msg:"A senha deve ter entre 6 a 12 caracteres",
            },
        ]
        const existeErros = erros.filter(erro => !erro.success)

        if(existeErros.length !== 0){
            res.status(400).json(existeErros)
        }else{
            const salt = bcrypt.genSaltSync(10);
            usuario.senha = bcrypt.hashSync(usuario.senha,salt);
            conexao.query(sql, usuario, (erro, resultado)=>{
                if(erro){
                    res.status(400).json(erro)
                    
                }else{
                    res.status(201).json({success:true, msg:`Usuário: ${usuario.nome_usuario} criado com sucesso`});
                   
                }
            })
        }
    }
    login = async(dadosLogin, res)=> {
        const {nome_usuario, senha} = dadosLogin;
        
        const sql = `SELECT nome_usuario,senha FROM Usuario WHERE nome_usuario="${nome_usuario}"`; 
        conexao.query(sql, (erro,resultado)=>{
                if(erro){
                    res.status(400).json(erro);
                }else{
                    const validation = bcrypt.compareSync(senha, resultado[0].senha)
                    if(resultado.length===0 || !validation ){
                        res.status(400).json({msg:'Usuário e/ou senha inválido(s)'})
                    }else{
                        const token = jwt.sign(
                            {
                                nome_usuario
                            },
                            senhaJWT,
                            {
                                expiresIn: '1 day',
                            }
                        )
                        res.status(202).json({auth:true, token:token})
                    }
                }
        })    
    }
    editUsuario = async(usuario, valores, res)=>{
        const sql = `UPDATE Usuario SET ? WHERE nome_usuario="${usuario}"`
        if(valores.senha){
            const salt = bcrypt.genSaltSync(10);
            valores.senha = bcrypt.hashSync(valores.senha,salt);
        }
        conexao.query(sql, valores, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultado)
            }
        })
    }

    

};

module.exports = new Usuario;