import { Hashtag, Picture, Post, User } from '../models';

const PostService = {
  createPost: async (userEmail: string, postData: PostData): Promise<Post> => {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

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
      postData.picture.map(async (picture) =>
        Picture.create({
          type: picture.type,
          size: picture.size,
          ext: picture.ext,
          src: picture.src,
        })
      )
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
