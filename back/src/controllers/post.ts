import * as express from 'express';
import PostService from '../services/post';

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
    const post = await PostService.createPost(req.user, req.body);

    res.status(201).json(<ResponseData>{
      success: true,
      message: '게시글 작성이 완료되었습니다.',
      data: post,
    });
  },
};

export default PostController;
