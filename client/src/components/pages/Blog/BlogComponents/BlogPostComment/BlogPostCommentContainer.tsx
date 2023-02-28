import { BlogComment } from '@app/services/blog/commentApi';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useMemo } from 'react';
import BlogPostCommentPresenter from './BlogPostCommentPresenter';

interface Props {
  postId?: string;
  comment: BlogComment;
}

const BlogPostCommentContainer = ({ postId, comment }: Props) => {
  const { data: userData } = useGetUserDataQuery();

  const userMatch = useMemo(() => {
    return !!(userData?.user?._id === comment.user._id || userData?.user?.role === 'admin');
  }, [comment.user._id, userData?.user?._id, userData?.user?.role]);

  return <BlogPostCommentPresenter userData={userData} postId={postId} comment={comment} userMatch={userMatch} />;
};

export default BlogPostCommentContainer;
