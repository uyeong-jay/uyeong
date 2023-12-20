import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TagsSummaryPresenter from './TagsSummaryPresenter';
import { useAppDispatch } from '@app/hooks';
import { BlogPostRes } from '@app/services/blog/postApi';
import { getTagName } from '@pages/Blog/BlogSlice';
import { TagWithCount } from '@pages/Blog/BlogPage/BlogContainer';
import { useRouter } from 'next/router';

interface Props {
  blogPostsData?: BlogPostRes;
}

const TagsSummaryContainer = ({ blogPostsData }: Props) => {
  const [clickedTag, setClickedTag] = useState(''); //클릭할 태크

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (clickedTag) {
      dispatch(getTagName(clickedTag)); //클릭된 태그가 포함시킴 > 이동시 이미 검색되어 있도록 함
      router.push('/blog');
    }
  }, [clickedTag, dispatch, router]);

  const onClickTag = useCallback(async (tagName: string) => {
    setClickedTag(tagName);
  }, []);

  //모든 태그 > 최근 태그 15개 제한
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
    return tagList.slice(0, 15);
  }, [blogPostsData?.posts]);

  return <TagsSummaryPresenter allTags={allTags} onClickTag={onClickTag} />;
};

export default TagsSummaryContainer;
