import { formatDistanceToNowStrict } from 'date-fns';

//업데이트된 or 만들어진 date(UTC, Universal Time Convention) 받기. ex) 2023-01-27T11:26:37.420Z
const formatDate = (date: string) => {
  const newDate = new Date(date);
  const now = Date.now();
  const diff = (now - newDate.getTime()) / 1000; // 현시간과의 차(초)

  if (diff < 60 * 1) {
    // 1분 미만
    return 'Just now';
  }

  try {
    return formatDistanceToNowStrict(newDate) + ' ago';
  } catch {
    return ' ago';
  }
};

export default formatDate;
