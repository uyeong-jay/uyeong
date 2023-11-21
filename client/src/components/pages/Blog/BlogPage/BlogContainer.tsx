import { useGetBlogPostsQuery } from '@app/services/blog/postApi';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import BlogPresenter from './BlogPresenter';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useGetBlogPostsBySearchQuery } from '@app/services/blog/postApi';
import { getPostsBySearch, getMorePostsBySearch, getTagName } from '@pages/Blog/BlogSlice';
import React from 'react';
// import dynamic from 'next/dynamic';
import { useIntersect } from '@hooks/useIntersect';
// import Loader from '@modals/Loader';

// const BlogPresenter = dynamic(() => import('./BlogPresenter'), {
//   // loading: () => <Loader />, // 로딩 중에 표시할 UI
//   // ssr: false, // 서버 사이드 렌더링 비활성화
// });

export interface TagWithCount {
  name: string;
  count: number;
}

const BlogContainer = () => {
  const dispatch = useAppDispatch();

  //포스트
  const { data: blogPostsData } = useGetBlogPostsQuery();

  const blogPostsBySearch = useAppSelector((state) => state.blog.blogPostsBySearch);

  //검색
  const initialSearchInfo = {
    nextPageId: '',
    searchWord: '',
  };
  const [searchInfo, setSearchInfo] = useState(initialSearchInfo);
  const { data: blogPostsDataBySearch } = useGetBlogPostsBySearchQuery(searchInfo);

  const tagName = useAppSelector((state) => state.blog.tagName);

  const [searchWordInput, setSearchWordInput] = useState('');
  const [isSearchStarted, setSearchStarted] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isClickedTag, setClickedTag] = useState(false);
  const [tagUnderline, setTagUnderline] = useState('');

  const [loadMore, setLoadMore] = useState(false);
  const [isIntersectionEnded, setIntersectionEnded] = useState(false);

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

  useEffect(() => {
    //초기화 이후 코드
    //새로고침 및 post 탭으로 복귀시 바로 초기화
    if (!tagName && !isClickedTag && !isInputFocused && !searchWordInput && !loadMore) {
      dispatch(getPostsBySearch(blogPostsDataBySearch));
      console.log('1');
    }
    //초기화 이후 코드
    if (tagName && !loadMore) {
      setSearchWordInput(tagName); //검색어 보여주기
      setSearchInfo({
        nextPageId: '',
        searchWord: tagName,
      }); //loadmore 이 안되는 상태에선 포함 가능한 데이터
      dispatch(getPostsBySearch(blogPostsDataBySearch));
      console.log('2');
    }

    //한번에 여러번 바뀌지 않게 시간 지연 시켜두기
    // (+ 한박자 늦게 바뀌도록 설정)
    if (isClickedTag && !isSearchStarted) {
      const timer = setTimeout(() => {
        dispatch(getPostsBySearch(blogPostsDataBySearch));
        setIntersectionEnded(false);
        console.log('3');
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
    if (isSearchStarted) {
      const timer = setTimeout(() => {
        dispatch(getPostsBySearch(blogPostsDataBySearch));
        setIntersectionEnded(false);
        setSearchStarted(false);
        console.log('4-1');
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
    if (loadMore) {
      const timer = setTimeout(() => {
        dispatch(getMorePostsBySearch(blogPostsDataBySearch));
        setIntersectionEnded(false);
        console.log('5');
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    blogPostsDataBySearch,
    dispatch,
    isClickedTag,
    isInputFocused,
    isSearchStarted,
    loadMore,
    searchWordInput,
    tagName,
  ]);

  const onClickTag = useCallback(
    (tag: string) => {
      dispatch(getTagName(''));
      setInputFocused(false);
      setSearchStarted(false);
      setLoadMore(false);
      setClickedTag(true);
      setTagUnderline(tag);
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
        setSearchStarted(true); //검색 연속동작을 위해 여기 고정
        setTagUnderline('');
        setSearchInfo({
          nextPageId: '',
          searchWord: value,
        });
        console.log('4-0');
      }, 700),
    [setSearchInfo],
  );

  //검색 with debounce
  const onChangeInput = useCallback(
    (e) => {
      setSearchWordInput(e.target.value);
      delayedSearchInfoUpdate(e.target.value);
      setLoadMore(false);
      setIntersectionEnded(true);
    },
    [delayedSearchInfoUpdate],
  );

  const onFocusInput = useCallback(() => {
    dispatch(getTagName(''));
    setClickedTag(false);
    setLoadMore(false);
    setInputFocused(true);
  }, [dispatch]);

  //Input 클릭시 검색어 전체 선택
  const onClickInput = useCallback(() => {
    inputRef.current?.select();
  }, []);

  //infinite scroll hook with IntersectionObserver
  const refa = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      //서버에서 받아온 next_cursor 가 있을때 실행
      if (blogPostsDataBySearch?.next_cursor && !isIntersectionEnded) {
        console.log('a');
        setIntersectionEnded(true);
        setLoadMore(true);
        setClickedTag(false);
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
  );

  return (
    <BlogPresenter
      refa={refa}
      blogPostsBySearch={blogPostsBySearch}
      allTags={allTags}
      tagUnderline={tagUnderline}
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
