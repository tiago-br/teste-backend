const { Router } = require("express");
const Usuario = require("../controllers/usuario.model");

const router = Router();

router.patch("/edituser/:usuario", (req, res) => {
    const usuario = req.params.usuario;
    const valores = req.body;
    Usuario.editUsuario(usuario, valores, res);
  });
  

module.exports = router;