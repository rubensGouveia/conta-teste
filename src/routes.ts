import express from 'express'
import ComprasController from './controller/ComprasController'
import QrController from './controller/QrController'


const routes = express.Router();


routes.get(`/carregar-compra/:id`, ComprasController.store);
routes.get(`/qrcode/:url`, QrController.store);
routes.get(`/pcode/:url`, QrController.pup);

export default routes;