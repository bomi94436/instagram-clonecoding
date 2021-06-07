import { Hashtag, Picture, Post, User } from '../models';
import { createModelAndValidation, CustomError } from '../utils';

const PostService = {
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
