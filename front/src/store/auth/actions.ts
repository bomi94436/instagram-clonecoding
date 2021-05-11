import { createAsyncAction } from 'typesafe-actions';
import { ResponseData } from '../types';
import { AxiosError } from 'axios';
import { SignUpData } from './types';

export const SIGN_UP = 'auth/SIGN_UP';
export const SIGN_UP_SUCCESS = 'auth/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'auth/SIGN_UP_ERROR';

export const signUpAsync = createAsyncAction(
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
)<SignUpData, ResponseData, AxiosError>();
