import { UserResponse } from '@app/services/user/userApi';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import Head from 'next/head';
import { BTN, DIV, SECTION } from './BlogCategoryStyle';
import BlogCategoryCard from '@pages/Blog/BlogComponents/BlogCategoryCard';
import { BlogCategoryRes } from '@app/services/blog/categoryApi';
import { BlogPostRes } from '@app/services/blog/postApi';
import AngleDoubleLeftIcon from '@icons/AngleDoubleLeftIcon';
import AngleDoubleRightIcon from '@icons/AngleDoubleRightIcon';
import AngleLeftIcon from '@icons/AngleLeftIcon';
import AngleRightIcon from '@icons/AngleRightIcon';
import BlogCategoryHeader from '@pages/Blog/BlogComponents/BlogCategoryHeader';

interface Props {
  userData?: UserResponse;
  blogPostsData?: BlogPostRes;
  blogCategoryData?: BlogCategoryRes;
  categoryPages: number[];
  categoryPageNum: number;
  totalPageCount: number;
  onClickPageNum: (v: number) => void;
  onClickFirstPage: () => void;
  onClickLastPage: () => void;
  onClickPrevFirstPage: () => void;
  onClickNextFirstPage: () => void;
  isLoadingCategories: boolean;
}

const CATEGORY_COUNT = 4;
const InitialCategoryCardArr = Array.from({ length: CATEGORY_COUNT }, (_, index) => index);

const BlogCategoryPresenter = ({
  userData,
  blogPostsData,
  blogCategoryData,
  categoryPages,
  categoryPageNum,
  totalPageCount,
  onClickPageNum,
  onClickFirstPage,
  onClickLastPage,
  onClickPrevFirstPage,
  onClickNextFirstPage,
  isLoadingCategories,
}: Props) => {
  return (
    <>
      <Head>
        <title>Blog | Category - UYeong</title>
      </Head>
      <SECTION.Frame>
        <BlogHeader />
        <DIV.Content>
          <BlogCategoryHeader userData={userData} />

          <DIV.CategoryCardGroup>
            {blogCategoryData ? (
              <>
                {blogCategoryData.categories?.map((category) => (
                  <BlogCategoryCard
                    key={category._id}
                    category={category}
                    userData={userData}
                    blogPostsData={blogPostsData}
                  />
                ))}
              </>
            ) : isLoadingCategories ? (
              <>
                {InitialCategoryCardArr.map((v) => (
                  <DIV.InitialCategoryCard key={v}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </DIV.InitialCategoryCard>
                ))}
              </>
            ) : (
              <DIV.NoCategory>- No Category yet -</DIV.NoCategory>
            )}
          </DIV.CategoryCardGroup>

          <DIV.PageBtnGroup>
            <button onClick={onClickFirstPage} className={categoryPageNum <= 1 ? 'disabled' : ''}>
              <AngleDoubleLeftIcon />
            </button>
            <button onClick={onClickPrevFirstPage} className={categoryPages[0] <= 1 ? 'disabled' : ''}>
              <AngleLeftIcon />
            </button>

            {categoryPages.map((pageNum) => (
              <BTN.PageNumBtn
                pageNum={pageNum}
                key={pageNum}
                onClick={() => onClickPageNum(pageNum)}
                className={categoryPageNum === pageNum ? 'aa' : ''}
              >
                {pageNum}
              </BTN.PageNumBtn>
            ))}

            <button
              onClick={onClickNextFirstPage}
              className={categoryPages[categoryPages.length - 1] >= totalPageCount ? 'disabled' : ''}
            >
              <AngleRightIcon />
            </button>
            <button onClick={onClickLastPage} className={categoryPageNum >= totalPageCount ? 'disabled' : ''}>
              <AngleDoubleRightIcon />
            </button>
          </DIV.PageBtnGroup>
        </DIV.Content>
      </SECTION.Frame>
    </>
  );
};

export default BlogCategoryPresenter;
