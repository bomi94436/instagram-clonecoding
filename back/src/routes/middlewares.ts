import * as express from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import { CustomError } from '../utils';
const jwt = require('jsonwebtoken');
const config = require('../config');

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const accessToken = req.header('x-access-token');
  if (!accessToken) throw new CustomError(401, '로그인이 필요한 서비스입니다.');

  jwt.verify(
    accessToken,
    config.jwtSecret,
    (jwtErr: VerifyErrors | null, decoded: Token | undefined): void => {
      if (jwtErr) throw new CustomError(401, '로그인이 필요한 서비스입니다.');

      req.user = decoded.email;
      next();
    }
  );
};

export const isNotLoggedIn = (req, res, next): void => {
  const token = req.header('x-access-token');
  if (token) {
    throw new CustomError(401, '로그인하지 않은 사용자만 접근 가능합니다.');
  }
  next();
};
