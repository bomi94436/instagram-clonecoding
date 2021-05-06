import * as express from 'express';
import sequelize from './models';

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

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('hello typescript express~!');
  }
);

app.listen(port, () => {
  console.log(`${port}포트 서버 대기 중!`);
});
