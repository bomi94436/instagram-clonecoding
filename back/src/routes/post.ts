import * as express from 'express';
import { CustomError, wrapAsync } from '../utils';
import PostController from '../controllers/post';
import { isLoggedIn } from './middlewares';
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

/*
 * /posts
 * */

try {
  fs.accessSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, done) => {
    const type = file.mimetype.split('/')[0];
    if (type !== 'image' && type !== 'video') {
      return done(
        new CustomError(409, '업로드는 이미지나 동영상만 가능합니다.')
      );
    }
    done(null, true);
  },
});

router.get('/', isLoggedIn, wrapAsync(PostController.readPost));
router.post('/', isLoggedIn, wrapAsync(PostController.createPost));
router.post(
  '/pictures',
  isLoggedIn,
  upload.array('upload'),
  wrapAsync(PostController.uploadPicture)
);

module.exports = router;
