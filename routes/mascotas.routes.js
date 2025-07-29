const express = require('express');
const router = express.Router();
const { getMascotas, postMascota } = require('../controllers/mascotas.controller');

router.get('/', getMascotas);
router.post('/', postMascota);

module.exports = router;
