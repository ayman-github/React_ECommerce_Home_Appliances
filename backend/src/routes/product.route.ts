import express, { Router } from 'express';
import { getAllProducts, create, getProduct } from '../controllers/products';
import { placeOrder } from '../controllers/order';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

//http://localhost:8000/api/product/create
router.post('/create', create);

//http://localhost:8000/api/product/getall
router.get('/getall', getAllProducts);

//http://localhost:8000/api/product/get?productId=
router.get('/get', getProduct);

//http://localhost:8000/api/product/placeOrder
router.post('/placeOrder', auth, placeOrder);

export = router;
