import { PostAction, PostState, ResponsePicture } from './types';
import { asyncState } from '../../lib/reducerUtils';
import produce from 'immer';

const initialState: PostState = {
  upload: asyncState.initial(),
  addPost: asyncState.initial(),
  picture: [],
};

const post = (state: PostState = initialState, action: PostAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'post/UPLOAD_PICTURE':
        draft.upload = asyncState.loading();
        break;
      case 'post/UPLOAD_PICTURE_SUCCESS':
        draft.upload = asyncState.success(action.payload);
        action.payload.data.forEach((value: ResponsePicture) => {
          draft.picture.push({
            id: draft.picture.length + 1,
            type: value.type,
            size: value.size,
            ext: value.ext,
            src: value.src,
          });
        });
        break;
      case 'post/UPLOAD_PICTURE_ERROR':
        draft.upload = asyncState.error(action.payload);
        break;

      case 'post/REORDER_UPLOADED':
        draft.picture = action.payload;
        break;

      case 'post/ADD_POST':
        draft.addPost = asyncState.loading();
        break;
      case 'post/ADD_POST_SUCCESS':
        draft.addPost = asyncState.success(action.payload);
        draft.picture = [];
        break;
      case 'post/ADD_POST_ERROR':
        draft.addPost = asyncState.error(action.payload);
        break;

      case 'post/REMOVE_PICTURE':
        draft.picture = draft.picture.filter((v) => v.id !== action.payload);
        break;
    }
  });

export default post;
