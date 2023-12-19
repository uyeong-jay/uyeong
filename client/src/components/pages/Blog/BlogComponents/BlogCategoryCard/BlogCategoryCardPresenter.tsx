import { ChangeEvent } from 'react';
import { DIV, P } from './BlogCategoryCardStyle';
import Button from '@atoms/Button';
import Image from 'next/image';
import { UserResponse } from '@app/services/user/userApi';
import formatDate from '@utils/formatDate';
import { BlogCategory } from '@app/services/blog/categoryApi';
import { BlogPost } from '@app/services/blog/postApi';
import Link from 'next/link';
import Logo from '@icons/Logo';
import Modal from '@modals/Modal';

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
  onClickDelete: (cardName: string, isCallback?: boolean) => void;
  onClickSave: (cardName: string, currName: string) => void;
  onChangeCategoryNameInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

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
  isModalOpen,
  setModalOpen,
}: Props) => {
  return (
    <DIV.Frame>
      {/* 카드 포스트 썸네일 */}
      <div className="blog-category-card-image-wrapper blog-category-card-image">
        {postsByCategoryName?.[postsByCategoryName.length - 1]?.thumbnail ? (
          <Image
            className="blog-category-card-image"
            src={postsByCategoryName[postsByCategoryName.length - 1]?.thumbnail as string}
            alt="category-card-image"
            layout="fill"
            objectFit="contain" //이미지를 틀에 맞게 맞추기
            priority
          />
        ) : (
          <div>
            <Logo />
          </div>
        )}
      </div>

      {/* 카드 내용 */}
      <DIV.CardContent>
        {/* 제목 */}
        <DIV.CardContentMain>
          {isUpdate ? (
            userData?.user?.role === 'admin' && (
              <>
                <input type="text" value={categoryName.name} onChange={onChangeCategoryNameInput} autoFocus />
                <Button
                  variant="update"
                  text="Save"
                  onClick={() => {
                    if (!categoryName.name) return;
                    onClickSave(cardName, categoryName.name);
                  }}
                />
              </>
            )
          ) : (
            <>
              {/* 이름 저장시 잠시 이전 이름이 노출되는 이슈 해결 */}
              {/* client data: categoryName.name */}
              {/* server data: cardName */}
              <span>
                <Link href={`/blog/category/${cardName}`}>{categoryName.name ? categoryName.name : cardName}</Link>
              </span>

              {userData?.user?.role === 'admin' && (
                <>
                  <Button variant="update" text="Edit" onClick={onClickEdit} />

                  <Button variant="delete" text="Delete" onClick={() => onClickDelete(cardName)} />
                </>
              )}
            </>
          )}
        </DIV.CardContentMain>

        {/* 에러 메시지 */}
        {error && <P.CardTitleError>{error.data.msg}</P.CardTitleError>}

        {/* 포스트 개수, 최근 업데이트 날짜 */}
        <DIV.CardContentFooter>
          <span>Posts: {postsByCategoryName?.length}</span>
          <span>Last update: {formatDate(category.updatedAt)}</span>
        </DIV.CardContentFooter>
      </DIV.CardContent>

      <Modal
        type="delete"
        msg="Are you sure you want to delete this category?"
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        callback={() => onClickDelete(cardName, true)}
      />
    </DIV.Frame>
  );
};

export default BlogCategoryCardPresenter;
