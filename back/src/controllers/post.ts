import * as express from 'express';
import PostService from '../services/post';
import { CustomError } from '../utils';

const PostController = {
  uploadPicture: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    res.status(201).json(<ResponseData>{
      success: true,
      message: '파일을 업로드했습니다.',
      data: req.files.map((v) => ({
        type: v.mimetype.split('/')[0],
        size: v.size,
        ext: v.mimetype.split('/')[1],
        src: v.filename,
      })),
    });
  },

  createPost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    if (req.body.content.length === 0) {
      throw new CustomError(400, '게시글의 내용을 작성하여야 합니다.');
    } else if (req.body.picture.length === 0) {
      throw new CustomError(
        400,
        '게시글을 작성하려면 하나 이상의 이미지나 동영상이 필요합니다.'
      );
    }

    const post = await PostService.createPost(req.user, req.body);

    res.status(201).json(<ResponseData>{
      success: true,
      message: '게시글 작성이 완료되었습니다.',
      data: post,
    });
  },
};

export default PostController;
