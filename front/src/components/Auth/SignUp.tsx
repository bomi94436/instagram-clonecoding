import React, { useCallback, useEffect, useState } from 'react';
import { StyledLink, StyledLogin, Wrapper } from './styles';
import logo from '../../lib/assets/InstagramLogo.png';
import { useDispatch } from 'react-redux';
import { signUpAsync } from '../../store/auth/actions';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/all';
import { validateSignUpData } from './validation';
import { SignUpData } from '../../store/auth/types';

const SignUp = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<SignUpData>({
    email: '',
    password: '',
    nickname: '',
  });
  const [errorMessage, setErrorMessage] = useState<SignUpData>({
    email: undefined,
    password: undefined,
    nickname: undefined,
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrorMessage((prev) => ({
      ...prev,
      [e.target.name]: validateSignUpData(
        e.target.name as keyof SignUpData,
        e.target.value
      ),
    }));
  }, []);

  const onSubmitLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      dispatch(signUpAsync.request(form));
    },
    [dispatch, form]
  );

  useEffect(() => {
    if (
      errorMessage.email === '' &&
      errorMessage.password === '' &&
      errorMessage.nickname === ''
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [errorMessage]);

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
            name="email"
            type="email"
            value={form.email}
            onChange={onChangeForm}
            placeholder="이메일(아이디)"
          />

          {errorMessage.email && <span>{errorMessage.email}</span>}

          <div className="password">
            <input
              name="password"
              type={viewPassword ? 'text' : 'password'}
              value={form.password}
              onChange={onChangeForm}
              placeholder="비밀번호"
            />
            <button
              type="button"
              onClick={() => setViewPassword((prev) => !prev)}
            >
              {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          {errorMessage.password && <span>{errorMessage.password}</span>}

          <input
            name="nickname"
            type="text"
            value={form.nickname}
            onChange={onChangeForm}
            placeholder="닉네임"
          />

          {errorMessage.nickname && <span>{errorMessage.nickname}</span>}

          <button type="submit" disabled={!isFormValid}>
            가입
          </button>
        </form>

        <span className="link">
          계정이 있으신가요? <StyledLink to="/login">로그인</StyledLink>
        </span>
      </StyledLogin>
    </Wrapper>
  );
};

export default SignUp;
