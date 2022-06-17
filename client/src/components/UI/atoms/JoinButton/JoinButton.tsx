import Link from 'next/link';

//커지면서 아래로 내려오는 반동그라미 (파란색)
//맨 상단 중간에 위치
//fixed 사용
const JoinButton = () => {
  return <Link href="/signin">Join</Link>;
};

export default JoinButton;
