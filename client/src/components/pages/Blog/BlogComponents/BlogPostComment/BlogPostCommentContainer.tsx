import { BlogCommenReq, useCreateBlogCommentMutation, useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import BlogPostCommentPresenter from './BlogPostCommentPresenter';

const BlogPostCommentContainer = () => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: userData } = useGetUserDataQuery();
  const { data: blogCommentsData } = useGetBlogCommentsQuery();
  const [createComment] = useCreateBlogCommentMutation();

  const initialState: BlogCommenReq = {
    user_id: userData?.user?._id,
    post_title: postTitle as string,
    content: '',
  };
  const [blogCommentInfo, setBlogCommentInfo] = useState(initialState);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        commentsInfo: blogCommentInfo,
        token: userData?.access_token,
      };
      createComment(data);
    },
    [blogCommentInfo, createComment, userData?.access_token],
  );

  const onChangeInput = useCallback(
    (e) => {
      setBlogCommentInfo({ ...blogCommentInfo, content: e.target.value });
    },
    [blogCommentInfo],
  );

  return (
    <BlogPostCommentPresenter
      blogCommentInfo={blogCommentInfo}
      blogCommentsData={blogCommentsData}
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
    />
  );
};

export default BlogPostCommentContainer;
