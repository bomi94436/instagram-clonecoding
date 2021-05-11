import * as express from 'express';
import { createModelAndValidation, ResponseData } from '../utils';
import { User } from '../models';
import to from 'await-to-js';
const UserService = require('../services/user');

exports.postUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const [err] = await to(createModelAndValidation(User, req.body));
  if (err) throw err;

  await UserService.postUser(req.body);

  res.status(201).json(<ResponseData>{
    success: true,
    message: '회원가입이 완료되었습니다.',
  });
};
