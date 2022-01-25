import BlogPostPresenter from './BlogPostPresenter';
import { BlogPostProps } from '@_types/types-blog';

const BlogPostContainer = ({ frontMatter, markdownBody }: BlogPostProps) => {
  return <BlogPostPresenter frontMatter={frontMatter} markdownBody={markdownBody} />;
};

export default BlogPostContainer;
