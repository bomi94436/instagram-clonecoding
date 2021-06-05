import { PostAction, PostState, ResponseUploadedContent } from './types';
import { asyncState } from '../../lib/reducerUtils';
import produce from 'immer';

const initialState: PostState = {
  upload: asyncState.initial(),
  uploadedSrc: [],
};

const post = (state: PostState = initialState, action: PostAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'post/UPLOAD':
        draft.upload = asyncState.loading();
        break;
      case 'post/UPLOAD_SUCCESS':
        draft.upload = asyncState.success(action.payload);
        action.payload.data.forEach((value: ResponseUploadedContent) => {
          draft.uploadedSrc.push({
            id: draft.uploadedSrc.length + 1,
            type: value.type,
            src: value.src,
          });
        });
        break;
      case 'post/UPLOAD_ERROR':
        draft.upload = asyncState.error(action.payload);
        break;

      case 'post/REORDER_UPLOADED':
        draft.uploadedSrc = action.payload;
        break;
    }
  });

export default post;
