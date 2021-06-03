import React, { useCallback, useRef } from 'react';
import AppLayout from '../common/AppLayout';
import { Wrapper } from './styles';
import { UserInfo } from '../../store/auth/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { uploadAsync } from '../../store/post/actions';

interface props {
  user: UserInfo;
}

const Upload = ({ user }: props) => {
  const dispatch = useDispatch();
  const uploadRef = useRef<HTMLInputElement>(null);
  const { data } = useSelector((state: RootState) => state.post.upload);

  const onClickImageUpload = useCallback(
    (e) => {
      e.preventDefault();
      if (uploadRef.current !== null) {
        uploadRef.current.click();
      }
    },
    [uploadRef]
  );

  const onChangeImages = useCallback(
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

  return (
    <AppLayout>
      <Wrapper>
        <form encType="multipart/form-data">
          <div>
            <input
              type="file"
              name="file"
              multiple
              hidden
              ref={uploadRef}
              onChange={onChangeImages}
            />
            <button onClick={onClickImageUpload}>이미지 업로드</button>
          </div>
        </form>

        <div>
          {data?.data.map((filename: string) => (
            <img
              key={filename}
              src={`http://localhost:3065/${filename}`}
              style={{ width: '200px' }}
              alt={filename}
            />
          ))}
        </div>
      </Wrapper>
    </AppLayout>
  );
};

export default Upload;
