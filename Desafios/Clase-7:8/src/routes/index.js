const { Router } = require('express');
const users = require('/Users/alanluna/Devs/DesafiosBackend/Desafios/Clase-7:8/src/routes/users');

const router = Router();

router.use('/users', users);

module.exports = router;