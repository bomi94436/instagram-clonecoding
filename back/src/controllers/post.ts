import * as express from 'express';

const PostController = {
  uploadPicture: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    res.status(201).json(<ResponseData>{
      success: true,
      message: '파일을 업로드했습니다.',
      data: req.files.map((v) => ({ type: v.mimetype, src: v.filename })),
    });
  },
};

export default PostController;
