import { UserResponse } from '@app/services/user/userApi';
import Button from '@atoms/Button';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader/BlogHeaderPresenter';
import InputBox from '@molecules/InputBox';
import Head from 'next/head';
import { ChangeEvent, FormEvent } from 'react';
import { StyledBlogCategory, StyledBlogCategoryContent } from './BlogCategoryStyle';
import BlogCategoryCard from '../../BlogComponents/BlogCtegoryCard/BlogCategoryCardContainer';

interface Props {
  userData: UserResponse | undefined;
  categoryInfo: { name: string };
  blogCategoryData?: {
    categories?: [
      {
        _id: string;
        name: string;
        createdAt: string;
      },
    ];
  };
  error: any;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeCategoryInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BlogCategoryPresenter = ({
  userData,
  blogCategoryData,
  categoryInfo,
  error,
  onSubmit,
  onChangeCategoryInput,
}: Props) => {
  const { name } = categoryInfo;

  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <StyledBlogCategory>
        <BlogHeader />
        <StyledBlogCategoryContent>
          {/* 카테고리 생성 바 (admin) */}
          {userData?.user?.role === 'admin' && (
            <form onSubmit={onSubmit}>
              <InputBox labelText="category" name="category" value={name} onChange={onChangeCategoryInput} />
              <Button variant="create" type="submit" text="Create" />
              {/* 에러 메세지 */}
              {error && (
                <div className="blog-category-error" style={{ color: 'red' }}>
                  {error.data.msg}
                </div>
              )}
            </form>
          )}

          {/* 카테고리 카드들 웨퍼 */}
          <div>
            {blogCategoryData?.categories?.map((category) => (
              <BlogCategoryCard key={category._id} category={category} userData={userData} />
            ))}
          </div>
        </StyledBlogCategoryContent>
      </StyledBlogCategory>
    </>
  );
};

export default BlogCategoryPresenter;
