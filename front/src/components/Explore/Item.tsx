import React from 'react';
import { Post } from '../../store/post/types';
import { BsHeartFill, FaPlay, IoChatbubble, IoCopy } from 'react-icons/all';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface props {
  post: Post;
}

const Item = ({ location, post }: props & RouteComponentProps) => {
  return (
    <button key={post.id}>
      <Link
        to={{
          pathname: `/post-detail/${post.id}`,
          state: { postDetail: location, mode: 'explore', post },
        }}
      >
        <div className="cover">
          <div>
            <BsHeartFill /> {post.likeCount}
          </div>
          <div>
            <IoChatbubble /> {post.comments.length}
          </div>
        </div>
        <div className="contents">
          {post.pictures[0].type === 'image' ? (
            <img
              src={`http://localhost:3065/${post.pictures[0].src}`}
              alt={post.pictures[0].src}
            />
          ) : (
            <video
              disablePictureInPicture
              preload="metadata"
              src={`http://localhost:3065/${post.pictures[0].src}#t=0`}
            />
          )}
          <div className="icon">
            {post.pictures.length === 1 ? (
              post.pictures[0].type === 'video' && <FaPlay />
            ) : (
              <IoCopy />
            )}
          </div>
        </div>
      </Link>
    </button>
  );
};

export default withRouter(Item);
