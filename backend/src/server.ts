import express from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.route';
import seedRoute from './routes/seed.route';
import userRoute from './routes/user.route';
import payRoute from './routes/pay.route';
import orderRoute from './routes/order.route';

//express
const app = express();
app.use(express.json());

//dotenv
import dotenv from 'dotenv';
dotenv.config();

//cors
import cors from 'cors';
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  })
);

//Routes
app.use(express.urlencoded({ extended: true }));
app.use('/api/product', productRoute);
app.use('/api/seed', seedRoute);
app.use('/api/user', userRoute);
app.use('/api/pay', payRoute);
app.use('/api/order', orderRoute);

// app.get('/api/products', (req: Request, res: Response) => {
//   res.json(sampleProduct);
// });

//database
mongoose
  .connect(process.env.DATABASE_URL || '', {
    retryWrites: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Error connecting to mongodb', err));

//server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}..`);
});
