import React, { useCallback } from 'react';
import { StyledLink, StyledLogin, Wrapper } from './styles';
import logo from '../../lib/assets/InstagramLogo.png';
import useInput from '../../lib/hooks/useInput';

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

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
          <button type="submit">로그인</button>
        </form>
        <span>
          계정이 없으신가요? <StyledLink to="/signup">가입하기</StyledLink>
        </span>
      </StyledLogin>
    </Wrapper>
  );
};

export default Login;
