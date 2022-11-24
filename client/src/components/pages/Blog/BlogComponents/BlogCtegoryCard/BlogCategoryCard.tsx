import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Button from '@atoms/Button';
import { StyledBlogCategoryCard } from './BlogCategoryCardStyle';

interface Props {
  category: {
    name: string;
    _id: string;
  };
  categoryName: { name: string };
  onChangeCateogoryNameInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSave: (name: string, cardName: string) => void;
  onClickDelete: (name: string) => void;
}

const BlogCategoryCard = ({
  category,
  categoryName,
  onChangeCateogoryNameInput,
  onClickSave,
  onClickDelete,
}: Props) => {
  const { name: cardName } = category;
  const { name } = categoryName;
  const [updateCategoryName, setUpdateCategoryName] = useState(false);

  console.log(!updateCategoryName);

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
        {!updateCategoryName ? (
          <>
            <p>{cardName}</p>
            <Button variant="update" text="Edit" onClick={() => setUpdateCategoryName((prev) => !prev)} />

            <Button variant="delete" text="Delete" onClick={() => onClickDelete(cardName)} />
          </>
        ) : (
          <>
            <input type="text" value={name} onChange={onChangeCateogoryNameInput} placeholder={cardName} />
            <Button
              variant="update"
              text="Save"
              onClick={() => {
                onClickSave(cardName, name);
              }}
            />

            <Button text="Back" onClick={() => setUpdateCategoryName((prev) => !prev)} />
          </>
        )}
      </div>

      {/* 포스트 개수, 최근 업데이트 날짜 */}
      <div>포스트개수, 마지막 업데이트: ~ 시간 전</div>
    </StyledBlogCategoryCard>
  );
};

export default BlogCategoryCard;

//수정버튼(input) > 저장버튼 (admin)
//삭제버튼 > 모달 (admin)
//저장버튼
