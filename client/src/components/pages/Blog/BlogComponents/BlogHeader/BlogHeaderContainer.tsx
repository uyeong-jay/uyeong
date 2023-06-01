import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useGetBlogPostsBySearchQuery } from '@app/services/blog/postApi';
import { getPostsBySearch, getTagName } from '@pages/Blog/BlogSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import BlogHeaderPresenter from './BlogHeaderPresenter';

const BlogHeaderContainer = () => {
  const [searchWordInput, setSearchWordInput] = useState('');
  const tagName = useAppSelector((state) => state.blog.tagName);

  const [searchWordActual, setSearchWordActual] = useState('');
  const { data: blogPostsDataBySearch } = useGetBlogPostsBySearchQuery(searchWordActual);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  //포스트 검색
  useEffect(() => {
    if (tagName) {
      setSearchWordInput(tagName); //검색된 태그이름 보여주기
      //검색하기
      setSearchWordActual(tagName);
      dispatch(getPostsBySearch(blogPostsDataBySearch));

      return;
    } else {
      const timer = setTimeout(() => {
        //검색하기
        setSearchWordActual(searchWordInput);
        dispatch(getPostsBySearch(blogPostsDataBySearch)); //setTimout 사용을 위해 slice 사용(RTK은 내부에 사용 안됨)
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [blogPostsDataBySearch, dispatch, searchWordInput, tagName]);

  //포스트 검색어 입력
  const onChangeInput = useCallback(
    (e) => {
      if (tagName) {
        setSearchWordActual(''); //search 내부 tagName 데이터 초기화
        dispatch(getTagName('')); //tagName 검색은 처음 1번만 유효하도록 하기
      }
      setSearchWordInput(e.target.value);
    },
    [dispatch, tagName],
  );

  const onClickInput = useCallback(() => {
    inputRef.current?.select();
  }, []);

  return (
    <BlogHeaderPresenter
      searchWordInput={searchWordInput}
      onChangeInput={onChangeInput}
      onClickInput={onClickInput}
      inputRef={inputRef}
    />
  );
};

export default BlogHeaderContainer;
