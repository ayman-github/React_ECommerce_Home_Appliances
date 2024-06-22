import express, { Router } from 'express';
import { getAllProducts, create } from '../controllers/products';

const router: Router = express.Router();

//http://localhost:5173/api/product/create
router.post('/create', create);

//http://localhost:5173/api/product/getall
router.get('/getall', getAllProducts);

export = router;
