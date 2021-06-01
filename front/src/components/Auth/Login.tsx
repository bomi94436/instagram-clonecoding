import React from 'react';
import { StyledLink, StyledLogin, Wrapper } from './styles';
import logo from '../../lib/assets/InstagramLogo.png';
import useInput from '../../lib/hooks/useInput';

interface props {
  onSubmitLogin: (
    e: React.FormEvent<HTMLFormElement>
  ) => (email: string, password: string) => void;
}

const Login = ({ onSubmitLogin }: props) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  return (
    <Wrapper>
      <StyledLogin>
        <img src={logo} alt="logo" />
        <form onSubmit={(e) => onSubmitLogin(e)(email, password)}>
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
        <span className="link">
          계정이 없으신가요? <StyledLink to="/signup">가입하기</StyledLink>
        </span>
      </StyledLogin>
    </Wrapper>
  );
};

export default Login;
