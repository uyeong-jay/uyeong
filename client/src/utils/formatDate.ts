import { formatDistanceToNowStrict } from 'date-fns';

//업데이트된 or 만들어진 date 전달 받기
//협정 세계시(UTC)(Universal Time Convention) 기준
//ex) 2023-01-27T11:26:37.420Z
const formatDate = (date: string) => {
  const newDate = new Date(date);
  return formatDistanceToNowStrict(newDate) + ' ago';
};

export default formatDate;

// < extra >
// import { format, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
// import { ko } from 'date-fns/locale';

// const formatDate = (date: string) => {
//   const newDate = new Date(date);
//   const now = Date.now();
//   const diff = (now - newDate.getTime()) / 1000; // 현시간과의 차(초)

//   if (diff < 60 * 1) {
//     // 1분 미만 > 방금 전
//     return '방금 전';
//   }

//   if (diff < 60 * 60 * 24 * 30) {
//     // 30일 미만 > ~시간 전, ~일 전
//     return formatDistanceToNow(newDate, { addSuffix: true, locale: ko });
//   }

//   return format(newDate, 'PPP', { locale: ko }); // 날짜 포맷
// };

// export default formatDate;
