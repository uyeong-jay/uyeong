interface userJoinInfoProps {
  nickname: string;
  email: string;
  password: string;
  cf_password: string;
}

interface userUpdateInfoProps {
  avatar?: string | File;
  nickname?: string;
  email?: string;
  old_password: string;
  new_password: string;
  cf_new_password: string;
}

interface userDataProps {
  nickname: string;
}

const validNickname = (nickname?: string) => {
  if (!nickname) return 'Please enter your nickname.';
  if (nickname.length < 2 || nickname.length > 20) return 'Nicknames must be between 2 and 20 characters long.';

  const regex = /[^\w\uAC00-\uD7A3]/; //영문자, 숫자, 밑줄, 한글을 제외한 다른 모든 문자 확인 정규식
  const nicknameGuidelinesText =
    'Nicknames can only include Korean characters, English letters, numbers, and underscores (_).';

  if (regex.test(nickname)) return nicknameGuidelinesText;
  else if (nickname.includes('\\')) return nicknameGuidelinesText; // 문자 '\' 포함 확인

  const koreanRegex = /[\uAC00-\uD7A3]/;
  const englishRegex = /[a-zA-Z]/;
  const containsKorean = koreanRegex.test(nickname);
  const containsEnglish = englishRegex.test(nickname);

  if (!(containsKorean || containsEnglish))
    return `Please make sure your nickname includes either a Korean character or English letters.`;

  return '';
};

const validEmail = (email?: string) => {
  if (!email) return 'Please enter your email.';
  return '';
};

const validPassword = (password: string, passwordName: string) => {
  if (0 < password.length && password.length < 6) return `Your ${passwordName} must be 6 characters or more.`;
  return '';
};

const validPasswordMatch = (password: string, cf_password: string, passwordName: string, cfPasswordName: string) => {
  if (password !== cf_password) return `Your ${passwordName} and ${cfPasswordName} must be same.`;
  return '';
};

export const validUserJoinInfo = (userJoinInfo: userJoinInfoProps) => {
  const { nickname, email, password, cf_password } = userJoinInfo;

  const nicknameError = validNickname(nickname);
  if (nicknameError) return nicknameError;

  const emailError = validEmail(email);
  if (emailError) return emailError;

  const passwordError = validPassword(password, 'password');
  if (passwordError) return passwordError;

  const cfPasswordError = validPassword(password, 'confirm password');
  if (cfPasswordError) return cfPasswordError;

  const passwordMatchError = validPasswordMatch(password, cf_password, 'password', 'confirm password');
  if (passwordMatchError) return passwordMatchError;

  return '';
};

export const validUserUpdateInfo = (
  userUpdateInfo: userUpdateInfoProps,
  userData?: userDataProps,
  isUnchangedAvatar?: boolean,
) => {
  const { nickname, email, old_password, new_password, cf_new_password } = userUpdateInfo;

  const userNickname = userData?.nickname;

  const nicknameError = validNickname(nickname);
  if (nicknameError) return nicknameError;

  const emailError = validEmail(email);
  if (emailError) return emailError;

  const oldPassword = validPassword(old_password, 'current password');
  if (oldPassword) return oldPassword;

  const newPassword = validPassword(old_password, 'new password');
  if (newPassword) return newPassword;

  const passwordMatchError = validPasswordMatch(new_password, cf_new_password, 'new password', 'confirm password');
  if (passwordMatchError) return passwordMatchError;

  //변경 된게 없을때
  if (
    isUnchangedAvatar &&
    nickname &&
    nickname === userNickname &&
    email &&
    !old_password &&
    !new_password &&
    !cf_new_password
  )
    return 'Already up to date.';

  //password 입력 에러
  //(다 있는상태 외 나머지 와 다 없는상태 외 나머지 의 합집합)
  if (!(old_password && new_password && cf_new_password) && !(!old_password && !new_password && !cf_new_password))
    return 'Please enter all password fields.';

  //password 일치 방지 에러
  if (old_password && new_password && old_password === new_password)
    return 'Your current password and new password must be different.';

  return '';
};

//사용법

//에러 모아 놓기
// const errMsg = [];

// errMsg.push(validUserInfo(userUpdateInfo));

//에러 보여주기
// setSettingErrMsg(errMsg[0]);
