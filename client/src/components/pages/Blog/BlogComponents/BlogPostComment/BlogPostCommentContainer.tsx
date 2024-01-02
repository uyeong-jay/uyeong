import { BlogComment } from '@app/services/blog/commentApi';
import { UserResponse } from '@app/services/user/userApi';
import { useMemo } from 'react';
import BlogPostCommentPresenter from './BlogPostCommentPresenter';

interface Props {
  userData?: UserResponse;
  postId?: string;
  comment: BlogComment;
}

const BlogPostCommentContainer = ({ userData, postId, comment }: Props) => {
  const userMatch = useMemo(() => {
    return !!(userData?.user?._id === comment.user._id || userData?.user?.role === 'admin');
  }, [comment.user._id, userData?.user?._id, userData?.user?.role]);

  return <BlogPostCommentPresenter userData={userData} postId={postId} comment={comment} userMatch={userMatch} />;
};

export default BlogPostCommentContainer;
