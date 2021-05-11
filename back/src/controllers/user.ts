import * as express from 'express';
import { ResponseData } from '../utils';
const UserService = require('../services/user');

exports.postUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  await UserService.postUser(req.body);

  res.status(201).json(<ResponseData>{
    success: true,
    message: '회원가입이 완료되었습니다.',
  });
};
