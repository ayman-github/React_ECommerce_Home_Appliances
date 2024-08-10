import express, { Router } from 'express';
import { getAllProducts, create, getProduct } from '../controllers/products';

const router: Router = express.Router();

//* Products
//http://localhost:8000/api/product/create
router.post('/create', create);
//http://localhost:8000/api/product/getall
router.get('/getall', getAllProducts);
//http://localhost:8000/api/product/get?productId=
router.get('/get', getProduct);

export = router;
