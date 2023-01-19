import { ChangeEvent } from 'react';
import { StyledBlogCategoryCard } from './BlogCategoryCardStyle';
import Button from '@atoms/Button';
import Image from 'next/image';
import { UserResponse } from '@app/services/user/userApi';
import formatDate from '@utils/formatDate';
import { BlogCategory } from '@app/services/blog/categoryApi';
import { BlogPost } from '@app/services/blog/postApi';
import Link from 'next/link';

interface Props {
  userData?: UserResponse;
  category: BlogCategory;
  cardName: string;
  categoryName: {
    name: string;
  };
  postsByCategoryName?: BlogPost[] | undefined;
  isUpdate: boolean;
  error: any;
  onClickEdit: () => void;
  onClickDelete: (cardName: string) => void;
  onClickSave: (cardName: string, currName: string) => void;
  onChangeCategoryNameInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

//수정버튼(input) > 저장버튼 (admin)
//삭제버튼 > 모달 (admin)
//저장버튼
const BlogCategoryCardPresenter = ({
  userData,
  category,
  cardName,
  categoryName,
  postsByCategoryName,
  isUpdate,
  error,
  onClickEdit,
  onClickDelete,
  onClickSave,
  onChangeCategoryNameInput,
}: Props) => {
  return (
    <StyledBlogCategoryCard>
      {/* 카드 포스트 썸네일 */}
      {/* 만약 포스트가 있으면 가장 최근 포스트의 썸네일을 보여주기 */}
      <div className="blog-category-card-image-wrapper card-image">
        <Image
          className="blog-category-card-image"
          src={
            postsByCategoryName
              ? (postsByCategoryName[postsByCategoryName.length - 1]?.thumbnail as string)
                ? (postsByCategoryName[postsByCategoryName.length - 1]?.thumbnail as string)
                : 'https://res.cloudinary.com/uyeong/image/upload/v1668671461/uyeong-blog/purplePNG_umvvlq.png'
              : 'https://res.cloudinary.com/uyeong/image/upload/v1668671461/uyeong-blog/purplePNG_umvvlq.png'
          }
          alt="category-card-image"
          width={400}
          height={270}
        />
      </div>

      {/* 카드 내용 */}
      <div className="card-content">
        {/* 제목 */}
        {isUpdate ? (
          userData?.user?.role === 'admin' && (
            <div className="card-content-title-wrapper">
              <input type="text" value={categoryName.name} onChange={onChangeCategoryNameInput} autoFocus />
              <Button
                variant="update"
                text="Save"
                onClick={() => {
                  if (!categoryName.name) return;
                  onClickSave(cardName, categoryName.name);
                }}
              />
            </div>
          )
        ) : (
          <div className="card-content-title-wrapper">
            {/* 이름 저장시 잠시 이전 이름이 노출되는 이슈 해결 */}
            {/* client data: categoryName.name */}
            {/* server data: cardName */}
            <p>
              <Link href={`/blog/category/${cardName}`}>{categoryName.name ? categoryName.name : cardName}</Link>
            </p>

            {userData?.user?.role === 'admin' && (
              <>
                <Button variant="update" text="Edit" onClick={onClickEdit} />

                <Button variant="delete" text="Delete" onClick={() => onClickDelete(cardName)} />
              </>
            )}
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="card-content-title-error" style={{ color: 'red' }}>
            {error.data.msg}
          </div>
        )}

        {/* 포스트 개수, 최근 업데이트 날짜 */}
        <div className="card-content-footer">
          포스트개수: {postsByCategoryName?.length}, 마지막 업데이트: {formatDate(category.updatedAt)}
        </div>
      </div>
    </StyledBlogCategoryCard>
  );
};

export default BlogCategoryCardPresenter;
