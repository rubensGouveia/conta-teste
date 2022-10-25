const express = require('express');
const ComprasController = require('./controller/ComprasController');

const routes = express.Router();


routes.get(`/carregar-compra/:id`, ComprasController.store);


module.exports = routes;