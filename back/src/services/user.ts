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
  if (exUser) throw new CustomError(403, '이미 사용중인 아이디입니다.');

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const [err2, user] = await to(
    User.create({
      email: userData.email,
      password: hashedPassword,
      nickname: userData.nickname,
    })
  );
  if (err2) throw new Error(err2.message);

  return user;
};
