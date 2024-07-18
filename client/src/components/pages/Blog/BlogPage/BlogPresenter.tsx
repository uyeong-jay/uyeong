import React, { ChangeEvent, RefObject } from 'react';
import { DIV, SECTION } from './BlogStyle';
import Head from 'next/head';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import { BlogPostRes } from '@app/services/blog/postApi';
import InputBox from '@molecules/InputBox/InputBox';
import SearchIcon from '@icons/SearchIcon';
import BlogTags from '../BlogComponents/BlogTags';
import BlogPosts from '@pages/Blog/BlogComponents/BlogPosts';
import MiniLoader from '@modals/MiniLoader';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@modals/Modal';
import XMarkIcon from '@icons/XMarkIcon';
// import { DIV as DIV_POSTS } from '../BlogComponents/BlogPosts/BlogPosts';
// import { InitialPostsCardArr } from '../BlogComponents/BlogPosts/BlogPosts';
// import dynamic from 'next/dynamic';

// const BlogPosts = dynamic(() => import('../BlogComponents/BlogPosts/BlogPosts'), {
//   loading: () => (
//     <DIV_POSTS.BlogPostsWrapper>
//       {InitialPostsCardArr.map((v) => (
//         <DIV_POSTS.InitialPostsCard key={v}></DIV_POSTS.InitialPostsCard>
//       ))}
//     </DIV_POSTS.BlogPostsWrapper>
//   ),
//   ssr: false,
// });

interface Props {
  userData?: UserResponse;
  blogPostsBySearch?: BlogPostRes;
  searchWordInput?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickInput?: () => void;
  onFocusInput?: () => void;
  onClickClearInput?: () => void;
  onClickTag: (tagName: string) => void;
  isTagClicked: boolean;
  tagUnderline: string;
  targetRef: RefObject<HTMLDivElement>;
  isLoadingPosts: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  deleteBlogPostError: any;
}

const BlogPresenter: React.FC<Props> = ({
  userData,
  blogPostsBySearch,
  searchWordInput,
  inputRef,
  onChangeInput,
  onClickInput,
  onFocusInput,
  onClickClearInput,
  onClickTag,
  tagUnderline,
  isTagClicked,
  targetRef,
  isLoadingPosts,
  isModalOpen,
  setModalOpen,
  deleteBlogPostError,
}) => {
  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <SECTION.Frame>
        <BlogHeader />
        <DIV.BlogBlock>
          <BlogTags tagUnderline={tagUnderline} onClickTag={onClickTag} isTagClicked={isTagClicked} />
          <SECTION.BlogMain>
            <DIV.SearchBar>
              <InputBox
                type="text"
                value={searchWordInput}
                onChange={onChangeInput}
                onClick={onClickInput}
                onFocus={onFocusInput}
                ref={inputRef}
                placeholder=""
                autofill={false}
              />
              {searchWordInput && (
                <span onClick={onClickClearInput}>
                  <XMarkIcon />
                </span>
              )}
              <SearchIcon />
            </DIV.SearchBar>
            <BlogPosts userData={userData} blogPostsBySearch={blogPostsBySearch} />
            <DIV.IntersectionTarget id="posts_intersection_target" ref={targetRef}>
              {isLoadingPosts ? (
                <MiniLoader w={30} responsive />
              ) : (
                !blogPostsBySearch?.next_cursor &&
                blogPostsBySearch?.hasMatchingPost && <DIV.NoMorePosts>- No more posts -</DIV.NoMorePosts>
              )}
            </DIV.IntersectionTarget>
          </SECTION.BlogMain>
        </DIV.BlogBlock>

        {deleteBlogPostError && (
          <Modal
            type="alert"
            msg={deleteBlogPostError.data.msg}
            isOpen={isModalOpen}
            setOpen={setModalOpen}
            shakeAlert
          />
        )}
      </SECTION.Frame>
    </>
  );
};

export default BlogPresenter;
