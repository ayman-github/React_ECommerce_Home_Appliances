import express, { Router } from 'express';
import { paypalKey, paypalPay } from '../controllers/paypal';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

//http://localhost:8000/api/pay/paypal/key
router.get('/paypal/key', auth, paypalKey);

//http://localhost:8000/api/pay/paypal/pay?orderId=
router.put('/paypal/pay', paypalPay);

export = router;
