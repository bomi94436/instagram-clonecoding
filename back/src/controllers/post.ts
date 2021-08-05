import * as express from 'express';
import sharp = require('sharp');
const fs = require('fs');
import PostService from '../services/post';

const PostController = {
  readPost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const posts = await PostService.readExplorePost(Number(req.query.lastId));

    res.status(200).json(<ResponseData>{
      success: true,
      message: 'explore 게시글 조회가 완료되었습니다.',
      data: posts,
    });
  },

  readHomePost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const posts = await PostService.readHomePost(
      req.user.id,
      Number(req.query.lastId)
    );

    res.status(200).json(<ResponseData>{
      success: true,
      message: 'home 게시글 조회가 완료되었습니다.',
      data: posts,
    });
  },

  createPost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    await PostService.createPost(req.user.id, req.body);

    res.status(201).json(<ResponseData>{
      success: true,
      message: '게시글 작성이 완료되었습니다.',
    });
  },

  resizePicture: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.all(
      req.files.map(
        (file) =>
          new Promise<void>((resolve) =>
            file.mimetype.split('/')[0] === 'image'
              ? sharp(file.path)
                  .resize({ width: 600 })
                  .withMetadata()
                  .toFile(`uploads/resize-${file.filename}`, () => {
                    fs.unlink(`uploads/${file.filename}`, () => {
                      resolve();
                    });
                  })
              : resolve()
          )
      )
    )
      .then(() => next())
      .catch((err) => {
        throw err;
      });
  },

  uploadPicture: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    res.status(201).json(<ResponseData>{
      success: true,
      message: '파일을 업로드했습니다.',
      data: req.files.map((file) => ({
        type: file.mimetype.split('/')[0],
        size: file.size,
        ext: file.mimetype.split('/')[1],
        src:
          (file.mimetype.split('/')[0] === 'image' ? 'resize-' : '') +
          file.filename,
      })),
    });
  },

  createComment: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const comment = await PostService.createComment(
      req.user.id,
      Number(req.params.postId),
      req.body.content,
      req.body.replyId
    );

    res.status(200).json(<ResponseData>{
      success: true,
      message: '댓글 작성이 완료되었습니다.',
      data: comment,
    });
  },

  likePost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    await PostService.likePost(req.user.id, Number(req.params.postId));

    res.status(200).json(<ResponseData>{
      success: true,
      message: '게시글에 좋아요 했습니다.',
      data: {
        postId: Number(req.params.postId),
      },
    });
  },

  unlikePost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    await PostService.unlikePost(req.user.id, Number(req.params.postId));

    res.status(200).json(<ResponseData>{
      success: true,
      message: '게시글에 좋아요를 취소했습니다.',
      data: {
        postId: Number(req.params.postId),
      },
    });
  },

  likeComment: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const postId = await PostService.likeComment(
      req.user.id,
      Number(req.params.commentId)
    );

    res.status(200).json(<ResponseData>{
      success: true,
      message: '댓글에 좋아요 했습니다.',
      data: {
        userId: req.user.id,
        postId,
        commentId: Number(req.params.commentId),
      },
    });
  },

  unlikeComment: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const postId = await PostService.unlikeComment(
      req.user.id,
      Number(req.params.commentId)
    );

    res.status(200).json(<ResponseData>{
      success: true,
      message: '댓글에 좋아요를 취소했습니다.',
      data: {
        userId: req.user.id,
        postId,
        commentId: Number(req.params.commentId),
      },
    });
  },

  deletePost: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const postId = Number(req.params.postId);
    await PostService.deletePost(req.user.id, postId);

    res.status(200).json(<ResponseData>{
      success: true,
      message: '게시글을 삭제했습니다.',
      data: {
        postId,
      },
    });
  },

  deleteComment: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.commentId);
    await PostService.deleteComment(req.user.id, postId, commentId);

    res.status(200).json(<ResponseData>{
      success: true,
      message: '게시글의 댓글을 삭제했습니다.',
      data: {
        postId,
        commentId,
      },
    });
  },
};

export default PostController;
