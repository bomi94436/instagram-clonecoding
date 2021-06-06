import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useRef } from 'react';
import { RootState } from '../../store';
import {
  addPostAsync,
  reorderPicture,
  uploadPictureAsync,
} from '../../store/post/actions';
import { DropResult } from 'react-beautiful-dnd';
import { Upload } from '../../components';

const UploadContainer = () => {
  const dispatch = useDispatch();
  const uploadRef = useRef<HTMLInputElement>(null);
  const picture = useSelector((state: RootState) => state.post.picture);

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
      e.preventDefault();
      const pictureFormData = new FormData();
      new Array(e.target.files.length).fill('').forEach((_, i) => {
        const type = e.target.files[i].type.split('/')[0];
        if (type !== 'image' && type !== 'video') {
          alert('업로드는 이미지나 동영상만 가능합니다.');
          return;
        }
        pictureFormData.append('upload', e.target.files[i]);
      });

      dispatch(uploadPictureAsync.request(pictureFormData));
    },
    [dispatch]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const newItems = Array.from(picture);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);

      dispatch(reorderPicture(newItems));
    },
    [dispatch, picture]
  );

  const onClickShare = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (
      content: string
    ) => {
      e.preventDefault();
      dispatch(addPostAsync.request({ content, picture }));
    },
    [dispatch, picture]
  );

  return (
    <Upload
      uploadRef={uploadRef}
      picture={picture}
      onClickUpload={onClickUpload}
      onChangeUpload={onChangeUpload}
      onDragEnd={onDragEnd}
      onClickShare={onClickShare}
    />
  );
};

export default UploadContainer;
