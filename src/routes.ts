import express from 'express'
import ComprasController from './controller/ComprasController'
import HomeController from './controller/HomeController'


const routes = express.Router();


routes.get(`/carregar-compra/:id`, ComprasController.store);
routes.get(`/:url`, HomeController.store);

export default routes;