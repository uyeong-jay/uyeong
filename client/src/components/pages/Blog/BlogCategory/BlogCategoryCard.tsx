import React from 'react';
import Image from 'next/image';
import Button from '@atoms/Button';
import styled from '@_settings/styled';

interface Props {
  onClickUpdate: () => void;
  onClickDelete: () => void;
  category: {
    name: string;
    _id: string;
  };
  // category: any;
}

const StyledBlogCategoryCard = styled.div`
  border: 1px solid black;
  width: 400px;
`;

const BlogCategoryCard = ({ onClickUpdate, onClickDelete, category }: Props) => {
  return (
    <StyledBlogCategoryCard>
      {/* 포스트 이미지 */}
      <div>
        {/* 만약 블로그가 있으면 다른 블로그 첫번째 이미지로 하기 */}
        <Image
          src="https://res.cloudinary.com/uyeong/image/upload/v1668671461/uyeong-blog/purplePNG_umvvlq.png"
          alt="category"
          width={400}
          height={200}
        />
      </div>
      <div>
        {/* 제목 */}
        <p>{category.name}</p>

        {/* 수정버튼(input) > 저장버튼 (admin) */}
        <Button variant="update" text="Edit" onClick={onClickUpdate} />

        {/* 삭제버튼 > 모달 (admin) */}
        <Button variant="delete" text="Delete" onClick={onClickDelete} />
      </div>

      {/* 포스트 개수, 최근 업데이트 날짜 */}
      <div>포스트개수, 마지막 업데이트: ~ 시간 전</div>
    </StyledBlogCategoryCard>
  );
};

export default BlogCategoryCard;
