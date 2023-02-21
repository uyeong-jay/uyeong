import {
  BlogComment,
  BlogCommentReq,
  useCreateBlogCommentMutation,
  useCreateBlogReplyMutation,
} from '@app/services/blog/commentApi';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import BlogPostCommentWritePresenter from './BlogPostCommentWritePresenter';

interface Props {
  postId?: string;
  comment?: BlogComment;
  isOpenReply?: boolean;
  setOpenReply?: (isOpenReply: boolean) => void;
  setOpenReplies?: (isOpenReplies: boolean) => void;
}

const editComment = (content: string) => {
  let markdownContent = content;
  markdownContent = markdownContent.replace(/(\r\n|\n){4,}/g, '&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n'); //엔터4번 이상을 줄바꿈 3번으로 대체

  markdownContent = markdownContent.replace(/(\r\n|\n)/g, '&nbsp;\n\n'); //엔터한번을 \n\n로 대체

  markdownContent = markdownContent.replaceAll('```&nbsp;', '```'); //code 마크다운 사용시 코드가 연장되는 이슈해결 정규식

  //*테이블 제외 모두 표현 가능

  return markdownContent;
};

const BlogPostCommentWriteContainer = ({ postId, comment, isOpenReply, setOpenReply, setOpenReplies }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: userData } = useGetUserDataQuery();
  const [createComment] = useCreateBlogCommentMutation();
  const [createReply] = useCreateBlogReplyMutation();

  const initialCommentState: BlogCommentReq = {
    post_id: postId as string,
    post_title: postTitle as string,
    user_id: userData?.user?._id, //현재 유저
    content: '',
    replies: [],
  };

  const initialReplyState = {
    post_id: postId as string,
    comment_id: comment?._id,
    reply_user_id: userData?.user?._id, //현재 유저
    reply_content: '',
    //답글에 달리는 댓글은 답글의 유저 이름만 표시해주기 백엔드에는 불필요
  };

  const [blogCommentInfo, setBlogCommentInfo] = useState(initialCommentState);

  const [blogReplyInfo] = useState(initialReplyState);

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
      if (!blogCommentInfo.content) return;

      const data = {
        commentInfo: {
          ...blogCommentInfo,
          content: editComment(blogCommentInfo.content),
        },
        token: userData?.access_token,
      };
      createComment(data);

      //comment후 높이 원복
      if (textareaRef.current !== null) {
        textareaRef.current.style.height = '150px';
      }

      //내용 초기화
      setBlogCommentInfo({ ...blogCommentInfo, content: '' });
    },
    [blogCommentInfo, createComment, userData?.access_token],
  );

  const onClickReply = useCallback(() => {
    if (!blogCommentInfo.content) return;

    const data = {
      replyInfo: {
        ...blogReplyInfo,
        reply_content: editComment(blogCommentInfo.content),
      },
      token: userData?.access_token,
    };
    createReply(data);

    //reply후 높이 원복
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = '150px';
    }

    //내용 초기화
    setBlogCommentInfo({ ...blogCommentInfo, content: '' });

    setOpenReplies?.(true);
  }, [blogCommentInfo, blogReplyInfo, createReply, setOpenReplies, userData?.access_token]);

  const onChangeComment = useCallback(
    (e) => {
      resizeHeight();
      setBlogCommentInfo({ ...blogCommentInfo, content: e.target.value });
    },
    [blogCommentInfo, resizeHeight],
  );

  const onClickCancel = useCallback(() => {
    setOpenReply?.(false);
  }, [setOpenReply]);

  return (
    <BlogPostCommentWritePresenter
      textareaRef={textareaRef}
      blogCommentInfo={blogCommentInfo}
      isOpenReply={isOpenReply}
      onSubmit={onSubmit}
      onChangeComment={onChangeComment}
      onClickReply={onClickReply}
      onClickCancel={onClickCancel}
    />
  );
};

export default BlogPostCommentWriteContainer;
