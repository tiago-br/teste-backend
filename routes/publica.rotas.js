const { Router } = require("express");
const Usuario = require("../controllers/usuario.model");

const router = Router();

router.post("/cadastro", (req, res) => {
  const dadosCadastro = req.body;
  Usuario.novoUsuario(dadosCadastro, res);
});

router.post("/login", (req, res)=>{
        const dadosLogin = req.body;
        Usuario.login(dadosLogin, res);
})


module.exports = router;
