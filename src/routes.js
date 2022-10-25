const express = require('express');
const ComprasController = require('./controller/ComprasController');
const HomeController = require('./controller/HomeController');

const routes = express.Router();


routes.get(`/carregar-compra/:id`, ComprasController.store);
routes.get(`/:url`, HomeController.store);


module.exports = routes;