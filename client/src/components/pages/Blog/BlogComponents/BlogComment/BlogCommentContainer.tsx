import { useCallback, useState } from 'react';
import BlogCommentPresenter from './BlogCommentPresenter';

const BlogCommentContainer = () => {
  const [blogComment, setBlogComment] = useState('');

  const onChangeInput = useCallback((e) => {
    setBlogComment(e.target.value);
  }, []);

  return <BlogCommentPresenter blogComment={blogComment} onChangeInput={onChangeInput} />;
};

export default BlogCommentContainer;
