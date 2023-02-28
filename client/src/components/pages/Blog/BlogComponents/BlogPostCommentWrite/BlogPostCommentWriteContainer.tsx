import {
  BlogComment,
  BlogReply,
  useCreateBlogCommentMutation,
  useCreateBlogReplyMutation,
  useUpdateBlogCommentMutation,
} from '@app/services/blog/commentApi';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import BlogPostCommentWritePresenter from './BlogPostCommentWritePresenter';

interface Props {
  postId?: string;
  comment?: BlogComment;
  reply?: BlogReply;
  taggedNickname?: string;
  regexTaggedNickname?: string;
  editComment?: boolean;
  setEditComment?: (editComment: boolean) => void;
  writeReply?: boolean;
  setWriteReply?: (writeReply: boolean) => void;
  setOpenReplies?: (isOpenReplies: boolean) => void;
  setCommentContent?: (commentContent: string) => void;
  setReplyContent?: (replyContent: string) => void;
}

//댓글or답글 내용 regex사용 편집
const regexEditComment = (content: string, taggedNickname = '') => {
  let markdownContent = content;

  markdownContent = markdownContent.replace(/(\r\n|\n)/g, '&nbsp;\n\n'); //엔터한번을 \n\n로 대체

  markdownContent = markdownContent.replaceAll('```&nbsp;', '```'); //code 마크다운이 연장되는 이슈해결 정규식

  //태그된 닉네임 스타일 변경
  //수정이 있어도 실행하기
  if (taggedNickname) {
    markdownContent = markdownContent.replace(
      `@${taggedNickname}`,
      `<span style="background-color: pink; color:red;">${taggedNickname}</span>`,
    );
  }

  //*테이블 제외 모두 표현 가능

  return markdownContent;
};

const BlogPostCommentWriteContainer = ({
  postId,
  comment,
  reply,
  taggedNickname,
  regexTaggedNickname,
  editComment,
  setEditComment,
  writeReply,
  setWriteReply,
  setOpenReplies,
  setCommentContent,
  setReplyContent,
}: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: userData } = useGetUserDataQuery();
  const [createComment] = useCreateBlogCommentMutation();
  const [createReply] = useCreateBlogReplyMutation();
  const [updateComment] = useUpdateBlogCommentMutation();

  //답글 regex사용 재편집
  const regexReply = () => {
    let replayContent = reply?.content.replaceAll('&nbsp;', '');
    replayContent = replayContent?.replace(/(\r\n\n|\n\n)/g, '\n'); //엔터두번을 \n로 대체

    replayContent = replayContent?.replace('<span style="background-color: pink; color:red;">', '@');
    replayContent = replayContent?.replace('</span>', '');

    return replayContent;
  };

  //댓글 regex사용 재편집
  const regexComment = () => {
    let commentContent = comment?.content.replaceAll('&nbsp;', '');
    commentContent = commentContent?.replace(/(\r\n\n|\n\n)/g, '\n'); //엔터두번을 \n로 대체

    return commentContent;
  };

  const initialState = {
    post_id: postId as string,
    post_title: postTitle as string,
    content:
      (taggedNickname ? '@' + taggedNickname + ' ' : '') ||
      (editComment ? (reply ? (regexReply() as string) : (regexComment() as string)) : ''),
  };

  const [blogCommentInfo, setBlogCommentInfo] = useState(initialState);

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

  //수정 버튼 클릭시 textarea 높이 변경
  useEffect(() => {
    if (editComment) {
      resizeHeight();
    }
  }, [editComment, resizeHeight]);

  //댓글 달기
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!blogCommentInfo.content) return;

      const data = {
        commentInfo: {
          ...blogCommentInfo,
          content: regexEditComment(blogCommentInfo.content),
          replies: [], //댓글용
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
      commentInfo: {
        ...blogCommentInfo,
        comment_id: comment?._id, //답글용
        content: regexEditComment(blogCommentInfo.content, taggedNickname),
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
    comment?._id,
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

  //댓글or답글 수정
  const onClickEditSave = useCallback(() => {
    const editContent = regexEditComment(blogCommentInfo.content, regexTaggedNickname);
    const data1 = {
      commentInfo: {
        id: reply?.comment_id ? reply?._id : comment?._id, //댓글, 답글 수정용
        content: editContent,
      },
      token: userData?.access_token,
    };

    //이름 저장시 잠시 이전 이름이 노출되는 이슈 해결차 추가
    {
      reply?.comment_id ? setReplyContent?.(editContent) : setCommentContent?.(editContent);
    }

    updateComment(data1);
    setEditComment?.(false);
  }, [
    blogCommentInfo.content,
    comment?._id,
    regexTaggedNickname,
    reply?._id,
    reply?.comment_id,
    setCommentContent,
    setEditComment,
    setReplyContent,
    updateComment,
    userData?.access_token,
  ]);

  const onClickEditCancel = useCallback(() => {
    setEditComment?.(false);
  }, [setEditComment]);

  return (
    <BlogPostCommentWritePresenter
      textareaRef={textareaRef}
      blogCommentInfo={blogCommentInfo}
      writeReply={writeReply}
      editComment={editComment}
      onSubmit={onSubmit}
      onChangeComment={onChangeComment}
      onClickReply={onClickReply}
      onClickCancel={onClickCancel}
      onClickEditCancel={onClickEditCancel}
      onClickEditSave={onClickEditSave}
    />
  );
};

export default BlogPostCommentWriteContainer;
