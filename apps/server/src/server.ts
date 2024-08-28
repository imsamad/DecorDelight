const envFilePath =
  process.env.NODE_ENV == 'production'
    ? `/etc/secrets/.env`
    : `${process.cwd()}/.env`;

require('dotenv').config({
  path: envFilePath,
});

import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { authRouter } from './routers/authRouter';
import cookieParser from 'cookie-parser';
import { CustomResponseError } from '@repo/utils';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import { productRouter } from './routers/productRouter';
import { cartRouter } from './routers/cartRouter';
import { orderRouter } from './routers/orderRouter';
import path from 'path';
import { assetRouter } from './routers/assetRouter';
import { addressRouter } from './routers/addressRouter';

const app: Express = express();

app
  .disable('x-powered-by')
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  )
  .use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: path.join(process.cwd(), '__tmp__'),
      createParentPath: true,
      safeFileNames: true,
      uriDecodeFileNames: true,
      uploadTimeout: 60_000,
      preserveExtension: true,
    })
  );

app.use((_, res, next) => {
  // res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN!);
  // res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/v1/assets', assetRouter);
app.use('/api/v1/addresses', addressRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);

app.get(['/status', '/'], async (req, res) => {
  res.json({ ok: true });
});

app.use(() => {
  throw new CustomResponseError(400, 'not found');
});

app.use(errorHandlerMiddleware);

export { app as server };
