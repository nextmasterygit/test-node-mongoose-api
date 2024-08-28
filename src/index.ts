import express from 'express';
import connectToDatabase from './database';
import morgan from 'morgan';
import 'dotenv/config';
import memberRouter from './route/member';
import productRouter from './route/product';
import categoryRouter from './route/category';

connectToDatabase();

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/member', memberRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`App is running on port # ${port}`);
});
