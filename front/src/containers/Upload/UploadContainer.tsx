import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useRef } from 'react';
import { RootState } from '../../store';
import { reorderUploaded, uploadAsync } from '../../store/post/actions';
import { DropResult } from 'react-beautiful-dnd';
import { Upload } from '../../components';
import { UserInfo } from '../../store/auth/types';

interface props {
  user: UserInfo;
}

const UploadContainer = ({ user }: props) => {
  const dispatch = useDispatch();
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploaded = useSelector((state: RootState) => state.post.uploadedSrc);

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
      const uploadFormData = new FormData();
      new Array(e.target.files.length).fill('').forEach((_, i) => {
        const type = e.target.files[i].type.split('/')[0];
        if (type !== 'image' && type !== 'video') {
          alert('업로드는 이미지나 동영상만 가능합니다.');
          return;
        }
        uploadFormData.append('uploading', e.target.files[i]);
      });

      dispatch(uploadAsync.request(uploadFormData));
    },
    [dispatch]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const newItems = Array.from(uploaded);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);

      dispatch(reorderUploaded(newItems));
    },
    [dispatch, uploaded]
  );

  return (
    <Upload
      user={user}
      uploadRef={uploadRef}
      uploaded={uploaded}
      onClickUpload={onClickUpload}
      onChangeUpload={onChangeUpload}
      onDragEnd={onDragEnd}
    />
  );
};

export default UploadContainer;
