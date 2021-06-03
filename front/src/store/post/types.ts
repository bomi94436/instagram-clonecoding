import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import { uploadAsync } from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
};

export type PostAction = ActionType<typeof uploadAsync>;
