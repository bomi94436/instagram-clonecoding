import * as express from 'express';
import UserController from '../controllers/user';
import { wrapAsync } from '../utils';
import { isLoggedIn } from './middlewares';

const router = express.Router();

/*
 * /users
 * */

router.get('/silent-refresh', wrapAsync(UserController.silentRefresh));
router.get('/logout', wrapAsync(UserController.logout));
router.get('/:nickname', isLoggedIn, wrapAsync(UserController.getUser));
router.post('/', wrapAsync(UserController.signUp));
router.post('/login', wrapAsync(UserController.login));

module.exports = router;
