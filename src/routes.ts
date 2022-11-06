import express from 'express'
import HomeController from './controller/HomeController';
import ComprasController from './controller/ComprasController'
import QrController from './controller/QrController'


const routes = express.Router();


routes.get(`/`, HomeController.store);
routes.get(`/carregar-compra/:id`, ComprasController.store);
routes.get(`/qrcode/:url`, QrController.store);
routes.get(`/pcode/:url`, QrController.pup);

export default routes;