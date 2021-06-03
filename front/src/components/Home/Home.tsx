import React, { useCallback, useRef } from 'react';
import faker from 'faker';
import AppLayout from '../common/AppLayout';
import { Wrapper } from './styles';
import Card from './Card';
import { UserInfo } from '../../store/auth/types';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAsync } from '../../store/post/actions';
import { RootState } from '../../store';

interface props {
  user: UserInfo;
}

const Home = ({ user }: props) => {
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
        uploadFormData.append('uploading', e.target.files[i]);
      });

      dispatch(uploadAsync.request(uploadFormData));
    },
    [dispatch]
  );

  return (
    <AppLayout>
      <Wrapper>
        <div className="left">
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

          <Card />
          <Card />
          <Card />
        </div>

        <div className="right">
          <div className="info">
            <div className="profile">
              <img src={faker.image.avatar()} alt={faker.image.avatar()} />
              <span>{user.nickname}</span>
            </div>

            <div className="follow">
              <button>
                게시물 <span className="num">0</span>
              </button>
              <button>
                팔로워 <span className="num">0</span>
              </button>
              <button>
                팔로우 <span className="num">0</span>
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </AppLayout>
  );
};
export default Home;
