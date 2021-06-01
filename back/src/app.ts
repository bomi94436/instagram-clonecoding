import * as express from 'express';
import sequelize from './models/sequelize';
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

import { CustomError } from './utils';
const userRouter = require('./routes/user');

const app = express();
app.use(morgan('dev'));
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

sequelize
  .sync()
  .then(() => {
    console.log('DB connection ...');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('hello?');
});
app.use('/user', userRouter);

app.use(
  (
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('🔥error: ', err);

    res
      .status(err.status || 500)
      .json(<ResponseData>{ success: false, message: err.message });
  }
);

const port = process.env.PORT || 3065;

app.listen(port, () => {
  console.log(`${port}포트 서버 대기 중!`);
});
