import { useGetBlogPostsQuery } from '@app/services/blog/postApi';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import BlogPresenter from './BlogPresenter';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useGetBlogPostsBySearchQuery } from '@app/services/blog/postApi';
import { getPostsBySearch, getTagName } from '@pages/Blog/BlogSlice';
import React from 'react';

export interface TagWithCount {
  name: string;
  count: number;
}

const BlogContainer = () => {
  //포스트
  const { data: blogPostsData } = useGetBlogPostsQuery();

  const blogPostsBySearch = useAppSelector((state) => state.blog.blogPostsBySearch);

  const dispatch = useAppDispatch();

  //검색
  const [searchWordInput, setSearchWordInput] = useState('');
  const [searchWordActual, setSearchWordActual] = useState('');
  const { data: blogPostsDataBySearch } = useGetBlogPostsBySearchQuery(searchWordActual);
  const tagName = useAppSelector((state) => state.blog.tagName);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isClickedTag, setClickedTag] = useState(false);

  const [savedTagName, setSavedTagName] = useState('');

  // 모든 태그 > 많은 순 정렬
  // +50개 로 끊기 (+더보기)
  const allTags = useMemo(() => {
    const tagList: TagWithCount[] = [];
    blogPostsData?.posts?.forEach((post) => {
      post.tags.forEach((postTag: string) => {
        const tagIndex = tagList.findIndex((tag) => tag.name === postTag);

        if (tagIndex !== -1) {
          tagList[tagIndex].count += 1;
        } else tagList.push({ name: postTag, count: 1 });
      });
    });
    return tagList.sort((a, b) => b.count - a.count);
  }, [blogPostsData?.posts]);

  //post탭으로 복귀시 바로 초기화
  useEffect(() => {
    if (!isClickedTag && !searchWordInput && !isInputFocused && !tagName) {
      dispatch(getPostsBySearch(blogPostsDataBySearch));
    }
  }, [blogPostsDataBySearch, dispatch, isClickedTag, isInputFocused, searchWordInput, tagName]);

  //포스트 검색 with 태그 클릭
  useEffect(() => {
    if (isClickedTag) {
      dispatch(getPostsBySearch(blogPostsDataBySearch));
      dispatch(getTagName(''));
    }
  }, [blogPostsDataBySearch, dispatch, isClickedTag]);

  // 포스트 검색 with 검색바
  useEffect(() => {
    if (!isClickedTag) {
      if (tagName && !searchWordInput && !isInputFocused) {
        setSearchWordInput(tagName); //검색어 보여주기
        setSearchWordActual(tagName);
      } else {
        const timer = setTimeout(() => {
          setSearchWordActual(searchWordInput);
          dispatch(getPostsBySearch(blogPostsDataBySearch)); //setTimout 사용을 위해 slice 사용(RTK은 내부에 사용 안됨)
          if (searchWordInput !== tagName) {
            dispatch(getTagName(searchWordInput)); // 검색어 유지
          }
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, [blogPostsDataBySearch, dispatch, isClickedTag, isInputFocused, searchWordInput, tagName]);

  const onClickTag = useCallback((tag: string) => {
    setClickedTag(true);
    setSearchWordInput('');
    setSearchWordActual(tag);
    setSavedTagName(tag);
  }, []);

  const onChangeInput = useCallback((e) => {
    setSearchWordInput(e.target.value);
  }, []);

  const onClickInput = useCallback(() => {
    inputRef.current?.select();
  }, []);

  const onFocusInput = () => {
    setIsInputFocused(true);
    setClickedTag(false);
  };

  return (
    <BlogPresenter
      blogPostsData={blogPostsData}
      blogPostsBySearch={blogPostsBySearch}
      allTags={allTags}
      savedTagName={savedTagName}
      searchWordInput={searchWordInput}
      onChangeInput={onChangeInput}
      onClickInput={onClickInput}
      onFocusInput={onFocusInput}
      inputRef={inputRef}
      onClickTag={onClickTag}
      isClickedTag={isClickedTag}
    />
  );
};

export default BlogContainer;
