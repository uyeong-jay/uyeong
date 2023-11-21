import React, { ChangeEvent, RefObject, useCallback } from 'react';
import { ASIDE, DIV, SECTION } from './BlogStyle';
import Head from 'next/head';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import { BlogPostRes } from '@app/services/blog/postApi';
import { TagWithCount } from './BlogContainer';
import { SubFrame } from '@templates/SubFrame';
import BlogPosts from '../BlogComponents/BlogPosts/BlogPosts';
import InputBox from '@molecules/InputBox/InputBox';
import SearchIcon from '@icons/SearchIcon';

interface Props {
  refa: any;
  blogPostsBySearch?: BlogPostRes;
  allTags: TagWithCount[];
  tagUnderline: string;
  searchWordInput?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickInput?: () => void;
  onFocusInput?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
  onClickTag: (tagName: string) => void;
  isClickedTag: boolean;
}

const BlogPresenter: React.FC<Props> = ({
  refa,
  blogPostsBySearch,
  allTags,
  tagUnderline,
  searchWordInput,
  onChangeInput,
  onClickInput,
  onFocusInput,
  inputRef,
  onClickTag,
  isClickedTag,
}) => {
  const tagNameLength = useCallback((tagName: string) => {
    const cutTagName = tagName.slice(0, 13);

    const finalTagName = tagName.length > 13 ? cutTagName + '..' : cutTagName;

    return finalTagName;
  }, []);

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
                  <DIV.BlogTag
                    key={index}
                    onClick={() => onClickTag(tag.name)}
                    tagUnderline={tagUnderline}
                    tagName={tag.name}
                    isClickedTag={isClickedTag}
                  >
                    {tagNameLength(tag.name)} ({tag.count})
                  </DIV.BlogTag>
                ))}
              </div>
            </ASIDE.BlogTags>
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
                />
                <SearchIcon />
              </DIV.SearchBar>
              <BlogPosts blogPostsBySearch={blogPostsBySearch} />
              <div ref={refa} style={{ height: '50px', border: '1px solid black' }}></div>
            </SECTION.BlogMain>
          </DIV.BlogBlock>
        </SubFrame>
      </SECTION.Frame>
    </>
  );
};

export default BlogPresenter;
