interface userUpdateInfoProps {
  avatar: string | File | undefined;
  nickname: string | undefined;
  email: string | undefined;
  password: string;
  cf_password: string;
}

interface userDataProps {
  nickname: string;
}

const valid = (userUpdateInfo: userUpdateInfoProps, userData: userDataProps | undefined) => {
  const { avatar, nickname, email, password, cf_password } = userUpdateInfo;

  const userNickname = userData?.nickname;

  //nickname 에러
  if (!nickname) return 'Please add your nickname.';
  else if (nickname.length < 2 || nickname.length > 10) return 'Your nickname must be between 2 and 10 characters.';

  //email 에러
  if (!email) return 'Please add your email.';

  //password 에러
  if (0 < password.length && password.length < 6) return 'Your password must be 6 chars or more.';
  else if (!password && cf_password) return 'Please add your password.';

  //cf_password 에러
  if (password && !cf_password) return 'Please add your confirm password.';
  else if (password && cf_password.length < 6) return 'Your confirm password also must be 6 chars or more.';
  else if (password && password !== cf_password) return 'Your password and confirm password should be same.';

  //변경 된게 없을때
  if (!avatar && nickname && nickname === userNickname && email && !password && !cf_password)
    return 'Already up to date';

  return '';
};

export default valid;
