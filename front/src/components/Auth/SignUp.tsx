import React, { useCallback } from 'react';
import { StyledLink, StyledLogin, Wrapper } from './styles';
import logo from '../../lib/assets/InstagramLogo.png';
import useInput from '../../lib/hooks/useInput';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const onSubmitLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      console.log(email, password);
    },
    [email, password]
  );

  return (
    <Wrapper>
      <StyledLogin>
        <img src={logo} alt="logo" />
        <p>
          친구들의 사진과 동영상을 보려면
          <br />
          가입하세요.
        </p>
        <form onSubmit={onSubmitLogin}>
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일"
          />
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
          />
          <input
            type="text"
            value={nickname}
            onChange={onChangeNickname}
            placeholder="닉네임"
          />
          <button type="submit">가입</button>
        </form>
        <span>
          계정이 있으신가요? <StyledLink to="/login">로그인</StyledLink>
        </span>
      </StyledLogin>
    </Wrapper>
  );
};

export default SignUp;
