import express, { Router } from 'express';
import { auth } from '../middleware/auth';
import { getOrder, getOrdersHistory, placeOrder } from '../controllers/order';

const router: Router = express.Router();

//http://localhost:8000/api/order/placeOrder
router.post('/placeOrder', auth, placeOrder);
//http://localhost:8000/api/order/getOrder?orderId=
router.get('/getOrder', auth, getOrder);

//http://localhost:8000/api/order/history?id=
router.get('/history', auth, getOrdersHistory);

export = router;
