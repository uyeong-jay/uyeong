export const makeUrlFriendly = (text: string) => {
  return text
    .toLowerCase() // 모든 문자를 소문자로 변환
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/g, '-') // 알파벳, 숫자, 한글(가-힣, ㄱ-ㅎ, ㅏ-ㅣ)을 제외한 모든 문자를 하이픈으로 변환
    .replace(/-+/g, '-') // 연속된 하이픈을 하나의 하이픈으로 변환
    .replace(/^-|-$/g, ''); // 시작 또는 끝의 하이픈 제거
};
