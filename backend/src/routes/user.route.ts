import express, { Router } from 'express';
import { login, register } from '../controllers/user';

const router: Router = express.Router();

//http://localhost:8000/api/user/register
router.post('/register', register);

//http://localhost:8000/api/user/login
router.post('/login', login);

export = router;
