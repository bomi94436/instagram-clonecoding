import to from 'await-to-js';
const bcrypt = require('bcrypt');

import { User } from '../models';
import { CustomError } from '../utils';

exports.postUser = async (userData: User): Promise<User> => {
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

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const [err3, user] = await to(
    User.create({
      email: userData.email,
      password: hashedPassword,
      nickname: userData.nickname,
    })
  );
  if (err3) throw Error(err3.message);

  return user;
};
