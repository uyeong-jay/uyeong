import { useGetBlogPostsQuery } from '@app/services/blog/postApi';
import { useMemo } from 'react';
import BlogPresenter from './BlogPresenter';

export interface TagWithCount {
  name: string;
  count: number;
}

const BlogContainer = () => {
  const { data: blogPostsData } = useGetBlogPostsQuery();

  //모든 태그 with 많은 순 정렬
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

  return <BlogPresenter blogPostsData={blogPostsData} allTags={allTags} />;
};

export default BlogContainer;
