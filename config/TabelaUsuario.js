class TabelaUsuario {
    init(conexao) {
      this.conexao = conexao;
      this.criarUsuario();
    }
    criarUsuario(){
      const sql = `CREATE TABLE IF NOT EXISTS Usuario (nome_usuario varchar(15) NOT NULL, senha varchar(150) NOT NULL, primeiro_nome varchar(20) NOT NULL, ultimo_sobrenome varchar(20), idade smallint NOT NULL, PRIMARY key(nome_usuario))`;
  
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log(`Tabela Usuario criada com sucesso`);
        }
      });
    }
  }
  
  module.exports = new TabelaUsuario();