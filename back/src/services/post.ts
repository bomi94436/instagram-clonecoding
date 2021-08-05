import {
  Comment,
  CommentLike,
  Follow,
  Hashtag,
  Picture,
  Post,
  PostLike,
  User,
} from '../models';
import { createModelAndValidation, CustomError } from '../utils';
import { FindOptions, Op, Transaction } from 'sequelize';
import sequelize from '../models/sequelize';

const PostService = {
  getReadPostOptions: (
    limit: number,
    where?: {
      id?: number;
      followerId?: number;
    }
  ): FindOptions => ({
    where,
    limit,
    order: [
      ['createdAt', 'DESC'],
      [{ model: Picture, as: 'pictures' }, 'id', 'ASC'],
      [{ model: Comment, as: 'comments' }, 'createdAt', 'ASC'],
      [
        { model: Comment, as: 'comments' },
        { model: Comment, as: 'replies' },
        'createdAt',
        'ASC',
      ],
    ],
    attributes: {
      exclude: ['userId'],
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'nickname'],
      },
      {
        model: Picture,
        attributes: ['id', 'type', 'src'],
      },
      {
        model: Comment,
        order: [[Comment, 'id', 'ASC']],
        attributes: {
          exclude: ['postId', 'userId'],
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'nickname'],
          },
          {
            model: CommentLike,
            as: 'likedUser',
            attributes: ['userId'],
          },
          {
            model: Comment,
            as: 'replies',
            attributes: {
              exclude: ['postId', 'userId'],
            },
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'nickname'],
              },
              {
                model: CommentLike,
                as: 'likedUser',
                attributes: ['userId'],
              },
            ],
          },
        ],
      },
    ],
  }),

  readExplorePost: async (lastId?: number) => {
    let where = {};

    if (lastId) {
      where = {
        id: { [Op.lt]: lastId },
      };
    }

    return await Post.findAll(PostService.getReadPostOptions(9, where));
  },

  readHomePost: async (userId: number, lastId?: number) => {
    let where = {};
    const or = [];

    if (lastId) {
      where = {
        id: { [Op.lt]: lastId },
      };
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    or.push({ userId: user.id });

    const followings = await Follow.findAll({
      where: {
        followerId: user.id,
      },
    });

    if (followings.length > 0) {
      followings.forEach((v) => {
        or.push({ userId: v.followingId });
      });
    }

    where = {
      ...where,
      [Op.or]: or,
    };

    return await Post.findAll(PostService.getReadPostOptions(5, where));
  },

  createPost: async (userId: number, postData: PostData): Promise<void> => {
    if (postData.content.length === 0) {
      throw new CustomError(400, '게시글의 내용을 작성하여야 합니다.');
    } else if (postData.picture.length === 0) {
      throw new CustomError(
        400,
        '게시글을 작성하려면 하나 이상의 이미지나 동영상이 필요합니다.'
      );
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    await createModelAndValidation(Post, { content: postData.content });

    const transaction: Transaction = await sequelize.transaction();

    try {
      const post = await Post.create(
        {
          content: postData.content,
          userId: user.id,
        },
        { transaction }
      );

      const hashtags = Array.from(
        new Set(postData.content.match(/(#[^\s#]+)/g))
      );

      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
              transaction,
            })
          )
        );
        await post.$add(
          'hashtags',
          result.map((v) => v[0]),
          { transaction }
        );
      }

      const pictures = await Promise.all(
        postData.picture.map(async (picture) => {
          await createModelAndValidation(Picture, picture);

          return Picture.create(
            {
              type: picture.type,
              size: picture.size,
              ext: picture.ext,
              src: picture.src,
            },
            { transaction }
          );
        })
      );
      await post.$add('pictures', pictures, { transaction });

      await user.update(
        {
          postCount: user.postCount + 1,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  createComment: async (
    userId: number,
    postId: number,
    content: string,
    replyId?: number
  ): Promise<Comment> => {
    await createModelAndValidation(Comment, { content });

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new CustomError(403, '존재하지 않는 게시글입니다.');

    if (replyId) {
      const comment = await Comment.findOne({
        where: {
          id: replyId,
          postId,
        },
      });
      if (!comment) throw new CustomError(403, '존재하지 않는 댓글입니다.');
      if (comment.replyId)
        throw new CustomError(403, '답글에 답글을 달 수 없습니다.');
    }

    const comment = await Comment.create({
      userId,
      postId,
      content,
      replyId,
    });

    return await Comment.findOne({
      where: {
        id: comment.id,
      },
      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'nickname'],
        },
        {
          model: CommentLike,
          as: 'likedUser',
        },
        {
          model: Comment,
          as: 'replies',
        },
      ],
    });
  },

  likePost: async (userId: number, postId: number): Promise<void> => {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new CustomError(403, '존재하지 않는 게시글입니다.');

    const isLiked = await PostLike.findOne({
      where: {
        postId,
        userId: user.id,
      },
    });
    if (isLiked) throw new CustomError(403, '이미 좋아요를 표시한 글입니다.');

    const transaction: Transaction = await sequelize.transaction();

    try {
      const like = await PostLike.create({
        postId,
        userId: user.id,
      });

      await post.$add('likedUser', like, { transaction });

      await post.update(
        {
          likeCount: post.likeCount + 1,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  unlikePost: async (userId: number, postId: number): Promise<void> => {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new CustomError(403, '존재하지 않는 게시글입니다.');

    const isLiked = await PostLike.findOne({
      where: {
        postId,
        userId: user.id,
      },
    });
    if (!isLiked)
      throw new CustomError(403, '이미 좋아요를 표시하지 않은 글입니다.');

    const transaction: Transaction = await sequelize.transaction();

    try {
      await PostLike.destroy({
        where: {
          postId,
          userId: user.id,
        },
      });

      await post.update(
        {
          likeCount: post.likeCount - 1,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  likeComment: async (userId: number, commentId: number): Promise<number> => {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw new CustomError(403, '존재하지 않는 댓글입니다.');

    const isLiked = await CommentLike.findOne({
      where: {
        commentId,
        userId: user.id,
      },
    });
    if (isLiked) throw new CustomError(403, '이미 좋아요를 표시한 글입니다.');

    await CommentLike.create({
      commentId,
      userId: user.id,
    });

    return comment.postId;
  },

  unlikeComment: async (userId: number, commentId: number): Promise<number> => {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw new CustomError(403, '존재하지 않는 댓글입니다.');

    const isLiked = await CommentLike.findOne({
      where: {
        commentId,
        userId: user.id,
      },
    });
    if (!isLiked)
      throw new CustomError(403, '이미 좋아요를 표시하지 않은 댓글입니다.');

    await CommentLike.destroy({
      where: {
        commentId,
        userId: user.id,
      },
    });

    return comment.postId;
  },

  deletePost: async (userId: number, postId: number): Promise<void> => {
    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new CustomError(403, '존재하지 않는 게시글입니다.');

    if (post.userId !== userId)
      throw new CustomError(
        403,
        '게시글 작성자만 해당 게시글을 삭제할 수 있습니다.'
      );

    const transaction: Transaction = await sequelize.transaction();

    try {
      await Post.destroy({
        where: {
          id: postId,
        },
        transaction,
      });

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      await user.update(
        {
          postCount: user.postCount - 1,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  deleteComment: async (
    userId: number,
    postId: number,
    commentId: number
  ): Promise<void> => {
    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new CustomError(403, '존재하지 않는 게시글입니다.');

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw new CustomError(403, '존재하지 않는 댓글입니다.');

    if (comment.userId !== userId)
      throw new CustomError(
        403,
        '댓글 작성자만 해당 댓글을 삭제할 수 있습니다.'
      );

    await Comment.destroy({
      where: {
        [Op.or]: {
          id: commentId,
          replyId: commentId,
        },
      },
    });
  },
};

export default PostService;
