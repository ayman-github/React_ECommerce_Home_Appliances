import express, { Router } from 'express';
import { getAllProducts, create, getProduct } from '../controllers/products';
import { getOrder, placeOrder } from '../controllers/order';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

//* Products
//http://localhost:8000/api/product/create
router.post('/create', create);
//http://localhost:8000/api/product/getall
router.get('/getall', getAllProducts);
//http://localhost:8000/api/product/get?productId=
router.get('/get', getProduct);

//* Orders
//http://localhost:8000/api/product/placeOrder
router.post('/placeOrder', auth, placeOrder);
//http://localhost:8000/api/product/getOrder?orederId=
router.get('/getOrder', auth, getOrder);

export = router;
