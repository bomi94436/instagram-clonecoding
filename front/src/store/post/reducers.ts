import { PostAction, PostState } from './types';
import { asyncState } from '../../lib/reducerUtils';
import produce from 'immer';

const initialState: PostState = {
  upload: asyncState.initial(),
};

const post = (state: PostState = initialState, action: PostAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'post/UPLOAD':
        draft.upload = asyncState.loading();
        break;
      case 'post/UPLOAD_SUCCESS':
        draft.upload = asyncState.success(action.payload);
        break;
      case 'post/UPLOAD_ERROR':
        draft.upload = asyncState.error(action.payload);
        break;
    }
  });

export default post;
