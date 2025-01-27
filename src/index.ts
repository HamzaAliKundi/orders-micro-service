import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';
import connectDB from './config/db';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Orders Service OK' });
});

app.use('/api/orders', orderRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Order Service listening on port: ${PORT}`);
});