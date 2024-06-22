import express, { Request, Response } from 'express';
import { sampleProduct } from './data';
const app = express();
import cors from 'cors';

const corsOptions = require('./config/corsOptions');
//import corsOptions from './config/corsOptions';
app.use(cors(corsOptions));

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProduct);
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
