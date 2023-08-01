import React, { ChangeEvent, RefObject } from 'react';
import { ASIDE, DIV, SECTION } from './BlogStyle';
import Head from 'next/head';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import { BlogPostRes } from '@app/services/blog/postApi';
import { TagWithCount } from './BlogContainer';
import { SubFrame } from '@templates/SubFrame';
import BlogPosts from '../BlogComponents/BlogPosts/BlogPosts';
import InputBox from '@molecules/InputBox/InputBox';
// import dynamic from 'next/dynamic';
// import Loader from '@modals/Loader';
// const BlogPostCard: any = dynamic(() => import('@pages/Blog/BlogComponents/BlogPostCard') as any, {
//   loading: () => <Loader />,
// });

interface Props {
  blogPostsData?: BlogPostRes;
  blogPostsBySearch?: BlogPostRes;
  allTags: TagWithCount[];
  searchWordInput?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickInput?: () => void;
  onFocusInput?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
  onClickTag: (tagName: string) => void;
}

const BlogPresenter: React.FC<Props> = ({
  blogPostsData,
  blogPostsBySearch,
  allTags,
  searchWordInput,
  onChangeInput,
  onClickInput,
  onFocusInput,
  inputRef,
  onClickTag,
}) => {
  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <SECTION.Frame>
        <BlogHeader />
        <SubFrame>
          <DIV.BlogBlock>
            <ASIDE.BlogTags>
              <div className="tags-wrapper">
                {allTags.map((tag, index) => (
                  <div key={index} onClick={() => onClickTag(tag.name)}>
                    {tag.name} ({tag.count})
                  </div>
                ))}
              </div>
            </ASIDE.BlogTags>
            <SECTION.BlogMain>
              <InputBox
                type="text"
                value={searchWordInput}
                onChange={onChangeInput}
                onClick={onClickInput}
                onFocus={onFocusInput}
                ref={inputRef}
                placeholder=""
              />
              <BlogPosts blogPostsData={blogPostsData} blogPostsBySearch={blogPostsBySearch} />
            </SECTION.BlogMain>
          </DIV.BlogBlock>
        </SubFrame>
      </SECTION.Frame>
    </>
  );
};

export default BlogPresenter;
