import * as express from 'express';
import { createModelAndValidation } from '../utils';
import { User } from '../models';
import to from 'await-to-js';
import UserService from '../services/user';

const UserController = {
  signUp: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const [err] = await to(createModelAndValidation(User, req.body));
    if (err) throw err;

    await UserService.signUp(req.body);

    res.status(201).json(<ResponseData>{
      success: true,
      message: '회원가입이 완료되었습니다.',
    });
  },

  login: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const { accessToken, refreshToken, info } = await UserService.login(
      req.body
    );
    res.cookie('x-refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14일
    });

    res.status(201).json(<ResponseData>{
      success: true,
      message: '로그인이 완료되었습니다.',
      data: {
        token: accessToken,
        info,
      },
    });
  },

  silentRefresh: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const oldRefreshToken = req.cookies['x-refresh-token'];
    const { accessToken, refreshToken, info } = await UserService.silentRefresh(
      oldRefreshToken
    );

    res.cookie('x-refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14일
    });

    res.status(200).json(<ResponseData>{
      success: true,
      message: '로그인 연장이 완료되었습니다.',
      data: {
        token: accessToken,
        info,
      },
    });
  },

  logout: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const refreshToken = req.cookies['x-refresh-token'];

    await UserService.logout(refreshToken);

    res.cookie('x-refresh-token', '', { maxAge: 0 });
    res.status(200).json(<ResponseData>{
      success: true,
      message: '로그아웃 되었습니다.',
    });
  },

  getUser: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const info = await UserService.getUser(req.params.nickname);

    if (!info)
      res.status(404).json(<ResponseData>{
        success: false,
        message: '사용자 정보를 찾을 수 없습니다.',
      });

    res.status(200).json(<ResponseData>{
      success: true,
      message: '사용자 정보 조회가 완료되었습니다.',
      data: info,
    });
  },
};

export default UserController;
