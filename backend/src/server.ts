import express, { Request, Response } from 'express';
import { sampleProduct } from './data';
const app = express();

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProduct);
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
