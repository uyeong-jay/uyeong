import { UserResponse } from '@app/services/userApi';
import Button from '@atoms/Button';
import BlogHeader from '@pages/Blog/BlogHeader';
import InputBox from '@molecules/InputBox';
import Head from 'next/head';
import { ChangeEvent, FormEvent } from 'react';
import { StyledBlogCategory, StyledBlogCategoryContents } from './BlogCategoryStyle';
import BlogCategoryCard from './BlogCategoryCard';

interface Props {
  userData: UserResponse | undefined;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  blogCategoryInfo: { name: string };
  blogCategoryData?: {
    categories?: [
      {
        _id: string;
        name: string;
      },
    ];
  };
  onClickUpdate: () => void;
  onClickDelete: () => void;
}

const BlogCategoryPresenter = ({
  userData,
  onChangeInput,
  onSubmit,
  blogCategoryInfo,
  blogCategoryData,
  onClickUpdate,
  onClickDelete,
}: Props) => {
  const { name } = blogCategoryInfo;

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
              <InputBox labelText="category" name="category" value={name} onChange={onChangeInput} />
              <Button variant="create" type="submit" text="Create" />
            </form>
          )}

          {/* 카테고리 카드 여러개 웨퍼 */}
          <div>
            {blogCategoryData?.categories?.map((category) => (
              <BlogCategoryCard
                key={category._id}
                category={category}
                onClickUpdate={onClickUpdate}
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
