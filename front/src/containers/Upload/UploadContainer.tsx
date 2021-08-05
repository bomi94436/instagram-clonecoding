import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useRef } from 'react';
import { RootState } from '../../store';
import {
  createPostAsync,
  deletePicture,
  reorderPicture,
  uploadPictureAsync,
} from '../../store/post/actions';
import { DropResult } from 'react-beautiful-dnd';
import { Upload } from '../../components';

const UploadContainer = () => {
  const dispatch = useDispatch();
  const uploadRef = useRef<HTMLInputElement>(null);
  const pictures = useSelector(
    (state: RootState) => state.post.uploadedPicture
  );

  const onClickUpload = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (uploadRef.current !== null) {
        uploadRef.current.click();
      }
    },
    [uploadRef]
  );

  const onChangeUpload = useCallback(
    (e) => {
      let status = true;

      e.preventDefault();
      const pictureFormData = new FormData();
      new Array(e.target.files.length).fill('').forEach((_, i) => {
        const type = e.target.files[i].type.split('/')[0];
        if (type !== 'image' && type !== 'video') {
          alert('업로드는 이미지나 동영상만 가능합니다.');
          status = false;
          return;
        }
        pictureFormData.append('upload', e.target.files[i]);
      });

      status && dispatch(uploadPictureAsync.request(pictureFormData));
    },
    [dispatch]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const newItems = Array.from(pictures);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);

      dispatch(reorderPicture(newItems));
    },
    [dispatch, pictures]
  );

  const onClickShare = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (
      content: string
    ) => {
      e.preventDefault();
      let status = true;

      if (content.length === 0) {
        alert('게시글의 내용을 작성하여야 합니다.');
        status = false;
      } else if (pictures.length === 0) {
        alert('게시글을 작성하려면 하나 이상의 이미지나 동영상이 필요합니다.');
        status = false;
      }
      status &&
        dispatch(createPostAsync.request({ content, picture: pictures }));
    },
    [dispatch, pictures]
  );

  const onClickRemovePicture = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (
      pictureId: number
    ) => {
      dispatch(deletePicture(pictureId));
    },
    [dispatch]
  );

  return (
    <Upload
      uploadRef={uploadRef}
      pictures={pictures}
      onClickUpload={onClickUpload}
      onChangeUpload={onChangeUpload}
      onDragEnd={onDragEnd}
      onClickShare={onClickShare}
      onClickRemovePicture={onClickRemovePicture}
    />
  );
};

export default UploadContainer;
