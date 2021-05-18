const regexEmail: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regexPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
const regexNickname: RegExp = /^([가-힣ㄱ-ㅎa-zA-Z0-9._])+$/;

export const validateSignUpData = (
  name: keyof SignUpData,
  value: string
): string => {
  switch (name) {
    case 'email':
      if (value === '') {
        return '이메일을 입력해야 합니다.';
      } else if (!value.match(regexEmail)) {
        return '이메일 형식으로 입력해야 합니다.';
      }
      return '';

    case 'password':
      if (value === '') {
        return '비밀번호를 입력해야 합니다.';
      } else if (value.length < 6 || value.length > 18) {
        return '비밀번호는 6자 이상 18자 이하여야 합니다.';
      } else if (!value.match(regexPassword)) {
        return '비밀번호는 영어, 숫자 조합이어야 합니다.';
      }
      return '';

    case 'nickname':
      if (value === '') {
        return '닉네임을 입력해야 합니다.';
      } else if (value.length < 4 || value.length > 16) {
        return '닉네임은 4자 이상 16자 이하여야 합니다.';
      } else if (!value.match(regexNickname)) {
        return '닉네임은 한글, 영어, 숫자, 특수문자(. _)로만 가능합니다.';
      }
      return '';

    default:
      return '';
  }
};
