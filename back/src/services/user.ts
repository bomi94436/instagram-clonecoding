import to from 'await-to-js';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { User } from '../models';
import { CustomError } from '../utils';
import { VerifyErrors } from 'jsonwebtoken';
const config = require('../config');

const UserService = {
  signUp: async (userData: User): Promise<User> => {
    const [err1, exUser] = await to(
      User.findOne({
        where: {
          email: userData.email,
        },
      })
    );
    if (exUser) throw new CustomError(409, '이미 사용중인 아이디입니다.');

    const [err2, exUser2] = await to(
      User.findOne({
        where: {
          nickname: userData.nickname,
        },
      })
    );
    if (exUser2) throw new CustomError(409, '이미 사용중인 닉네임입니다.');

    const hashedPassword: string = await bcrypt.hash(userData.password, 12);
    const [err3, user] = await to(
      User.create({
        email: userData.email,
        password: hashedPassword,
        nickname: userData.nickname,
      })
    );
    if (err3) throw err3;

    return user;
  },

  generateToken: async (
    id: number,
    email: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const accessToken: string = jwt.sign(
      {
        id,
        email,
      },
      config.jwtSecret,
      {
        expiresIn: '1h',
      }
    );
    const refreshToken: string = jwt.sign(
      {
        id,
        email,
      },
      config.jwtSecret,
      {
        expiresIn: '14d',
      }
    );

    const [err] = await to(
      User.update(
        {
          token: refreshToken,
        },
        {
          where: {
            id,
            email,
          },
        }
      )
    );
    if (err) throw err;

    return {
      accessToken,
      refreshToken,
    };
  },

  login: async (
    userData: User
  ): Promise<ReturnType<typeof UserService.generateToken> & User> => {
    const [err1, user] = await to(
      User.findOne({
        where: {
          email: userData.email,
        },
      })
    );
    if (err1) throw err1;
    if (!user)
      throw new CustomError(
        401,
        '일치하는 아이디가 없거나, 비밀번호가 일치하지 않습니다.'
      );

    const result: boolean = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!result)
      throw new CustomError(
        401,
        '일치하는 아이디가 없거나, 비밀번호가 일치하지 않습니다.'
      );

    const [err2, info] = await to(
      User.findOne({
        where: {
          email: userData.email,
        },
        attributes: ['id', 'email', 'nickname'],
      })
    );
    if (err2) throw err2;

    const { accessToken, refreshToken } = await UserService.generateToken(
      info.id,
      info.email
    );

    return {
      accessToken,
      refreshToken,
      info,
    };
  },

  silentRefresh: async (
    loggedInUser: string,
    oldRefreshToken: string
  ): Promise<ReturnType<typeof UserService.generateToken>> =>
    jwt.verify(
      oldRefreshToken,
      config.jwtSecret,
      async (jwtErr: VerifyErrors | null, decoded: Token | undefined) => {
        if (jwtErr) {
          if (jwtErr.message === 'jwt expired') {
            throw new CustomError(
              401,
              '로그인이 만료되었습니다. 다시 로그인 해주세요.'
            );
          } else {
            throw new CustomError(403, '유효하지 않은 로그인입니다.');
          }
        }

        const [dbErr, user] = await to(
          User.findOne({
            where: {
              id: decoded.id,
            },
          })
        );
        if (dbErr) throw dbErr;

        if (user.token === oldRefreshToken && loggedInUser === user.email) {
          const { accessToken, refreshToken } = await UserService.generateToken(
            decoded.id,
            decoded.email
          );

          return { accessToken, refreshToken };
        } else {
          throw new CustomError(403, '유효하지 않은 로그인입니다.');
        }
      }
    ),

  logout: async (refreshToken: string): Promise<void> => {
    const [err] = await to(
      User.update(
        {
          token: null,
        },
        {
          where: {
            token: refreshToken,
          },
        }
      )
    );
    if (err) throw err;
  },
};

export default UserService;
