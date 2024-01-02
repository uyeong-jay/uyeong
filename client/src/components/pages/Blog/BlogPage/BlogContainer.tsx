import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import BlogPresenter from './BlogPresenter';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useGetBlogPostsBySearchQuery } from '@app/services/blog/postApi';
import { getPostsBySearch, getMorePostsBySearch, getTagName } from '@pages/Blog/BlogSlice';
import React from 'react';
import { useIntersect } from '@hooks/useIntersect';

export interface TagWithCount {
  name: string;
  count: number;
}

const BlogContainer = () => {
  const dispatch = useAppDispatch();

  //포스트
  const blogPostsBySearch = useAppSelector((state) => state.blog.blogPostsBySearch);

  //검색
  const initialSearchInfo = {
    nextPageId: '',
    searchWord: '',
  };
  const [searchInfo, setSearchInfo] = useState(initialSearchInfo);
  const { data: blogPostsDataBySearch, isFetching } = useGetBlogPostsBySearchQuery(searchInfo);

  const tagName = useAppSelector((state) => state.blog.tagName);

  const [searchWordInput, setSearchWordInput] = useState('');
  const [isSearchStarted, setSearchStarted] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isTagClicked, setTagClicked] = useState(false);
  const [tagUnderline, setTagUnderline] = useState('');

  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isIntersectionEnded, setIntersectionEnded] = useState(false);
  const [isLoadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    //새로고침, post 탭으로 복귀(초기화된 이후)
    if (!tagName && !isTagClicked && !isInputFocused && !canLoadMore) {
      dispatch(getPostsBySearch(blogPostsDataBySearch));
    }
    //tagName 통해서 왔을때(초기화된 이후)
    if (tagName && !canLoadMore) {
      setSearchWordInput(tagName);
      setSearchInfo({
        nextPageId: '',
        searchWord: tagName,
      }); //canLoadmore 이 안되는 상태에서 넣을 수 있는 데이터
      dispatch(getPostsBySearch(blogPostsDataBySearch));
    }

    //한번에 여러번 바뀌지 않게 시간 지연 시켜두기
    // (+ 한박자 늦게 바뀌도록 설정)
    if (isTagClicked && !isSearchStarted && !canLoadMore) {
      const timer = setTimeout(() => {
        dispatch(getPostsBySearch(blogPostsDataBySearch));
        setIntersectionEnded(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
    if (isSearchStarted && !canLoadMore) {
      const timer = setTimeout(() => {
        dispatch(getPostsBySearch(blogPostsDataBySearch));
        setIntersectionEnded(false);
        setSearchStarted(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
    if (canLoadMore) {
      const timer = setTimeout(() => {
        dispatch(getMorePostsBySearch(blogPostsDataBySearch));
        setIntersectionEnded(false);
        setLoadingPost(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [blogPostsDataBySearch, dispatch, isTagClicked, isInputFocused, isSearchStarted, canLoadMore, tagName]);

  const onClickTag = useCallback(
    (tag: string) => {
      setCanLoadMore(false);
      dispatch(getTagName(''));
      setInputFocused(false);
      setSearchStarted(false);
      setTagClicked(true);
      setTagUnderline(tag);
      setSearchWordInput(tag);
      setSearchInfo({
        nextPageId: '',
        searchWord: tag,
      });
      setIntersectionEnded(true);
    },
    [dispatch],
  );

  //검색 with debounce
  const debounce = (func: (value: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (value: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(value);
      }, delay);
    };
  };

  //검색 with debounce
  //사용자의 마지막 입력이 끝난 후 0.7초 뒤 실헹
  const delayedSearchInfoUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setSearchStarted(true); //검색 연속동작 가능
        setIntersectionEnded(true);
        setSearchWordInput(value);
        setTagUnderline('');
        setTagClicked(false);
        setSearchInfo({
          nextPageId: '',
          searchWord: value,
        });
      }, 700),
    [setSearchInfo],
  );

  //검색 with debounce
  const onChangeInput = useCallback(
    (e) => {
      setSearchWordInput(e.target.value);
      delayedSearchInfoUpdate(e.target.value);
      setCanLoadMore(false);
    },
    [delayedSearchInfoUpdate],
  );

  const onFocusInput = useCallback(() => {
    dispatch(getTagName(''));
    setCanLoadMore(false);
    setInputFocused(true);
  }, [dispatch]);

  //Input 클릭시 검색어 전체 선택
  const onClickInput = useCallback(() => {
    inputRef.current?.select();
  }, []);

  //infinite scroll hook with IntersectionObserver
  const targetRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      //서버에서 받아온 next_cursor 가 있을때 실행
      if (!isFetching && blogPostsDataBySearch?.next_cursor && !isIntersectionEnded) {
        setTagClicked(false);
        setIntersectionEnded(true);
        setCanLoadMore(true);
        setLoadingPost(true);
        setSearchInfo({
          ...searchInfo,
          nextPageId: blogPostsDataBySearch.next_cursor,
        });
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    },
    'posts_intersection_target',
  );

  return (
    <BlogPresenter
      targetRef={targetRef}
      blogPostsBySearch={blogPostsBySearch}
      tagUnderline={tagUnderline}
      searchWordInput={searchWordInput}
      onChangeInput={onChangeInput}
      onClickInput={onClickInput}
      onFocusInput={onFocusInput}
      inputRef={inputRef}
      onClickTag={onClickTag}
      isTagClicked={isTagClicked}
      isLoadingPost={isLoadingPost}
    />
  );
};

export default BlogContainer;
