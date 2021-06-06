import * as express from 'express';
import UserController from '../controllers/user';
import { wrapAsync } from '../utils';
import { isLoggedIn } from './middlewares';

const router = express.Router();

/*
 * /users
 * */

router.post('/', wrapAsync(UserController.signUp));
router.post('/login', wrapAsync(UserController.login));
router.get(
  '/silent-refresh',
  isLoggedIn,
  wrapAsync(UserController.silentRefresh)
);
router.get('/logout', wrapAsync(UserController.logout));

module.exports = router;
