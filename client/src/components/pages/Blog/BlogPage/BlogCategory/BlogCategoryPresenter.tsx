import { UserResponse } from '@app/services/userApi';
import Button from '@atoms/Button';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader/BlogHeader';
import InputBox from '@molecules/InputBox';
import Head from 'next/head';
import { ChangeEvent, FormEvent } from 'react';
import { StyledBlogCategory, StyledBlogCategoryContents } from './BlogCategoryStyle';
import BlogCategoryCard from '../../BlogComponents/BlogCtegoryCard/BlogCategoryCard';

interface Props {
  userData: UserResponse | undefined;
  categoryInfo: { name: string };
  categoryName: { name: string };
  blogCategoryData?: {
    categories?: [
      {
        _id: string;
        name: string;
      },
    ];
  };
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeCategoryInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeCateogoryNameInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSave: (name: string, cardName: string) => void;
  onClickDelete: (name: string) => void;
}

const BlogCategoryPresenter = ({
  userData,
  blogCategoryData,
  categoryInfo,
  categoryName,
  onSubmit,
  onChangeCategoryInput,
  onChangeCateogoryNameInput,
  onClickSave,
  onClickDelete,
}: Props) => {
  const { name } = categoryInfo;

  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <StyledBlogCategory>
        <BlogHeader />
        <StyledBlogCategoryContents>
          {/* 카테고리 생성 바 (admin) */}
          {userData?.user?.role === 'admin' && (
            <form onSubmit={onSubmit}>
              <InputBox labelText="category" name="category" value={name} onChange={onChangeCategoryInput} />
              <Button variant="create" type="submit" text="Create" />
            </form>
          )}

          {/* 카테고리 카드들 웨퍼 */}
          <div>
            {blogCategoryData?.categories?.map((category) => (
              <BlogCategoryCard
                key={category._id}
                category={category}
                categoryName={categoryName}
                onChangeCateogoryNameInput={onChangeCateogoryNameInput}
                onClickSave={onClickSave}
                onClickDelete={onClickDelete}
              />
            ))}
          </div>
        </StyledBlogCategoryContents>
      </StyledBlogCategory>
    </>
  );
};

export default BlogCategoryPresenter;
