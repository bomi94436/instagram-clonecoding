import * as express from 'express';
import { wrapAsync } from '../utils';
const UserController = require('../controllers/user');

const router = express.Router();

/*
 * /user
 * */

router.post('/', wrapAsync(UserController.postUser));

module.exports = router;
