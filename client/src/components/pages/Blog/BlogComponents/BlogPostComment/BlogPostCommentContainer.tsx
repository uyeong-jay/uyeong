import { BlogCommenReq, useCreateBlogCommentMutation, useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import BlogPostCommentPresenter from './BlogPostCommentPresenter';

const BlogPostCommentContainer = () => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: userData } = useGetUserDataQuery();
  const { data: blogCommentsData } = useGetBlogCommentsQuery(postTitle as string);
  const [createComment] = useCreateBlogCommentMutation();

  const initialState: BlogCommenReq = {
    user_id: userData?.user?._id,
    post_title: postTitle as string,
    content: '',
  };
  const [blogCommentInfo, setBlogCommentInfo] = useState(initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = useCallback(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl !== null) {
      textareaEl.style.height = '150px';
      // console.log(textareaEl.scrollHeight); //2
      textareaEl.style.height = textareaEl.scrollHeight + 2 + 'px';
    }
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let commentContent = blogCommentInfo.content;

      //엔터4번 이상을 <br><br><br>로 대체
      commentContent = commentContent.replace(/(\r\n|\n){4,}/g, '<br><br><br>');

      //엔터한번을 <br>로 대체
      commentContent = commentContent.replace(/(\r\n|\n)/g, '<br>');

      const data = {
        commentsInfo: { ...blogCommentInfo, content: commentContent },
        token: userData?.access_token,
      };
      createComment(data);

      if (textareaRef.current !== null) {
        textareaRef.current.style.height = '150px';
      }

      setBlogCommentInfo({ ...blogCommentInfo, content: '' });
    },
    [blogCommentInfo, createComment, userData?.access_token],
  );

  const onChangeComment = useCallback(
    (e) => {
      resizeHeight();
      setBlogCommentInfo({ ...blogCommentInfo, content: e.target.value });
    },
    [blogCommentInfo, resizeHeight],
  );

  return (
    <BlogPostCommentPresenter
      textareaRef={textareaRef}
      blogCommentInfo={blogCommentInfo}
      blogCommentsData={blogCommentsData}
      onSubmit={onSubmit}
      onChangeComment={onChangeComment}
    />
  );
};

export default BlogPostCommentContainer;
