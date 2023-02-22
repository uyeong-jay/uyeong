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
  taggedNickname?: string;
  writeReply?: boolean;
  setWriteReply?: (writeReply: boolean) => void;
  setOpenReplies?: (isOpenReplies: boolean) => void;
}

//댓글or답글 내용 편집
const editComment = (content: string, taggedNickname = '') => {
  let markdownContent = content;
  markdownContent = markdownContent.replace(/(\r\n|\n){4,}/g, '&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n'); //엔터4번 이상을 줄바꿈 3번으로 대체

  markdownContent = markdownContent.replace(/(\r\n|\n)/g, '&nbsp;\n\n'); //엔터한번을 \n\n로 대체

  markdownContent = markdownContent.replaceAll('```&nbsp;', '```'); //code 마크다운이 연장되는 이슈해결 정규식

  //태그된 닉네임 스타일 변경
  if (taggedNickname) {
    markdownContent = markdownContent.replace(
      '@' + taggedNickname,
      `<span style="background-color: pink; color:red;">${taggedNickname}</span>`,
    );
  }

  //*테이블 제외 모두 표현 가능

  return markdownContent;
};

const BlogPostCommentWriteContainer = ({
  postId,
  comment,
  taggedNickname,
  writeReply,
  setWriteReply,
  setOpenReplies,
}: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: userData } = useGetUserDataQuery();
  const [createComment] = useCreateBlogCommentMutation();
  const [createReply] = useCreateBlogReplyMutation();

  const initialCommentState: BlogCommentReq = {
    post_id: postId as string,
    post_title: postTitle as string,
    user_id: userData?.user?._id, //현재 유저
    content: taggedNickname ? '@' + taggedNickname + ' ' : '',
    replies: [],
  };

  const initialReplyState = {
    post_id: postId as string,
    comment_id: comment?._id,
    reply_user_id: userData?.user?._id, //현재 유저
    reply_content: '',
  };

  const [blogCommentInfo, setBlogCommentInfo] = useState(initialCommentState);

  const [blogReplyInfo] = useState(initialReplyState);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //textarea 높이 수정
  const resizeHeight = useCallback(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl !== null) {
      textareaEl.style.height = '150px';
      // console.log(textareaEl.scrollHeight); //2
      textareaEl.style.height = textareaEl.scrollHeight + 2 + 'px';
    }
  }, []);

  //댓글 달기
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

  //답글 달기
  const onClickReply = useCallback(() => {
    if (!blogCommentInfo.content) return;

    const data = {
      replyInfo: {
        ...blogReplyInfo,
        reply_content: editComment(blogCommentInfo.content, taggedNickname),
      },
      token: userData?.access_token,
    };
    createReply(data);

    //reply후 높이 원복
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = '150px';
    }

    setBlogCommentInfo({ ...blogCommentInfo, content: '' }); //내용 초기화

    setOpenReplies?.(true); //답글 목록 펼치기
    setWriteReply?.(false); //답글 작성 숨기기
  }, [
    blogCommentInfo,
    blogReplyInfo,
    createReply,
    setOpenReplies,
    setWriteReply,
    taggedNickname,
    userData?.access_token,
  ]);

  //댓글or답글 입력
  const onChangeComment = useCallback(
    (e) => {
      resizeHeight();
      setBlogCommentInfo({ ...blogCommentInfo, content: e.target.value });
    },
    [blogCommentInfo, resizeHeight],
  );

  //댓글or답글 취소
  const onClickCancel = useCallback(() => {
    setWriteReply?.(false);
  }, [setWriteReply]);

  return (
    <BlogPostCommentWritePresenter
      textareaRef={textareaRef}
      blogCommentInfo={blogCommentInfo}
      writeReply={writeReply}
      onSubmit={onSubmit}
      onChangeComment={onChangeComment}
      onClickReply={onClickReply}
      onClickCancel={onClickCancel}
    />
  );
};

export default BlogPostCommentWriteContainer;
