import * as express from 'express';
import sequelize from './models/sequelize';
import { CustomError, ResponseData } from './utils';
const userRouter = require('./routes/user');

const app = express();
const port: number = Number(process.env.PORT) || 3000;

sequelize
  .sync()
  .then(() => {
    console.log('DB connection ...');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('hello typescript express~!');
  }
);

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

app.listen(port, () => {
  console.log(`${port}포트 서버 대기 중!`);
});
