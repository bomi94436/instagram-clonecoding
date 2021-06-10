import { Follow, Hashtag, Picture, Post, User } from '../models';
import { createModelAndValidation, CustomError } from '../utils';
import { Op } from 'sequelize';

const PostService = {
  readPost: async (lastId: number) => {
    let where = {};

    if (lastId) {
      where = {
        id: { [Op.lt]: lastId },
      };
    }

    return await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Picture,
          attributes: ['id', 'type', 'src'],
        },
      ],
    });
  },

  readHomePost: async (userEmail: string, lastId: number) => {
    let where = {};
    const or = [];

    if (lastId) {
      where = {
        id: { [Op.lt]: lastId },
      };
    }

    const user = await User.findOne({
      where: {
        email: userEmail,
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

    return await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Picture,
          attributes: ['id', 'type', 'src'],
        },
      ],
    });
  },

  createPost: async (userEmail: string, postData: PostData): Promise<Post> => {
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
        email: userEmail,
      },
    });

    await createModelAndValidation(Post, { content: postData.content });

    const post = await Post.create({
      content: postData.content,
      userId: user.id,
    });

    const hashtags = Array.from(new Set(postData.content.match(/(#[^\s#]+)/g)));

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      );
      await post.$add(
        'hashtags',
        result.map((v) => v[0])
      );
    }

    const pictures = await Promise.all(
      postData.picture.map(async (picture) => {
        await createModelAndValidation(Picture, picture);

        return Picture.create({
          type: picture.type,
          size: picture.size,
          ext: picture.ext,
          src: picture.src,
        });
      })
    );
    await post.$add('pictures', pictures);

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },

        {
          model: Picture,
        },
      ],
    });

    return fullPost;
  },
};

export default PostService;
