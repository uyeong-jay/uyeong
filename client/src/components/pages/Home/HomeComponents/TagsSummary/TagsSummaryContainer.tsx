import React, { useCallback, useEffect, useState } from 'react';
import TagsSummaryPresenter from './TagsSummaryPresenter';
import { useAppDispatch } from '@app/hooks';
import { getTagName } from '@pages/Blog/BlogSlice';
import { useRouter } from 'next/router';
import { useGetBlogTagsQuery } from '@app/services/blog/tagApi';

const TagsSummaryContainer = () => {
  const { data: blogTagsData } = useGetBlogTagsQuery({ limit: 20 });
  const [clickedTag, setClickedTag] = useState(''); //클릭할 태크

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (clickedTag) {
      dispatch(getTagName(clickedTag)); //클릭된 태그가 포함시킴 > 이동시 이미 검색되어 있도록 하기 위함
      router.push('/blog');
    }
  }, [clickedTag, dispatch, router]);

  const onClickTag = useCallback(async (tagName: string) => {
    setClickedTag(tagName);
  }, []);

  return <TagsSummaryPresenter blogTagsData={blogTagsData} onClickTag={onClickTag} />;
};

export default TagsSummaryContainer;
