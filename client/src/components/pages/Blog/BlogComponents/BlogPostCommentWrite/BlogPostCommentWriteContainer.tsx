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
  const [createComment, { error: createCommentError }] = useCreateBlogCommentMutation();
  const [createReply, { error: createReplyError }] = useCreateBlogReplyMutation();
  const [updateComment, { error: updateCommentError }] = useUpdateBlogCommentMutation();

  const [isNotLoggedIn, setNotLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (createCommentError || createReplyError || updateCommentError) {
      setModalOpen(true);
    }
  }, [createCommentError, createReplyError, updateCommentError]);

  //댓글or답글 내용 regex사용 편집
  const regexEditComment = useCallback((content: string, taggedNickname = '') => {
    let markdownContent = content;
    markdownContent.replace(/\n/g, '\n');

    //태그된 닉네임 스타일 변경
    if (taggedNickname) {
      markdownContent = markdownContent.replace(`@${taggedNickname}`, `**@${taggedNickname}**`);
    }

    return markdownContent;
  }, []);

  //답글 regex사용 재편집
  const regexReply = () => {
    let replayContent = reply?.content.replace(/\n/g, '\n');
    replayContent = replayContent?.replace('**@', '@');
    replayContent = replayContent?.replace('**', '');
    return replayContent;
  };

  //댓글 regex사용 재편집
  const regexComment = () => {
    const commentContent = comment?.content.replace(/\n/g, '\n');
    return commentContent;
  };

  const initialState = {
    post_id: postId as string, //포스트 삭제시 관련 댓글 모두 삭제할때 사용
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
      textareaEl.style.height = textareaEl.scrollHeight + 'px';
      //만약 border가 있으면 두께만큼 textareaEl.scrollHeight 여기에 숫자로 더해주기
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

      if (!userData?.access_token) {
        if (isNotLoggedIn) return;
        return setNotLoggedIn(true);
      }

      const data = {
        commentInfo: {
          ...blogCommentInfo,
          content: regexEditComment(blogCommentInfo.content),
          replies: [], //댓글용
        },
        token: userData?.access_token,
      };
      createComment(data);

      //댓글 작성 후 높이 원복
      if (textareaRef.current !== null) {
        textareaRef.current.style.height = '150px';
      }

      //내용 초기화
      setBlogCommentInfo({ ...blogCommentInfo, content: '' });
    },
    [blogCommentInfo, createComment, isNotLoggedIn, regexEditComment, userData?.access_token],
  );

  //답글 달기
  const onClickReply = useCallback(() => {
    if (!blogCommentInfo.content) return;

    if (!userData?.access_token) {
      if (isNotLoggedIn) return;
      setNotLoggedIn(true);
      return;
    }

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
    isNotLoggedIn,
    regexEditComment,
    setOpenReplies,
    setWriteReply,
    taggedNickname,
    userData?.access_token,
  ]);

  //댓글or답글 입력
  const onChangeComment = useCallback(
    (e) => {
      if (userData?.access_token) {
        resizeHeight();
        setBlogCommentInfo({ ...blogCommentInfo, content: e.target.value });
      } else {
        if (isNotLoggedIn) return;
        setNotLoggedIn(true);
        return;
      }
    },
    [blogCommentInfo, isNotLoggedIn, resizeHeight, userData?.access_token],
  );

  //댓글or답글 입력 취소
  const onClickReplyCancel = useCallback(() => {
    setWriteReply?.(false);
  }, [setWriteReply]);

  //댓글or답글 수정
  const onClickEditSave = useCallback(() => {
    if (!blogCommentInfo.content) return;

    if (!userData?.access_token) {
      if (isNotLoggedIn) return;
      setNotLoggedIn(true);
      return;
    }

    const editContent = regexEditComment(blogCommentInfo.content, regexTaggedNickname);
    const data = {
      commentInfo: {
        id: reply?.comment_id ? reply?._id : comment?._id, //댓글, 답글 수정용
        content: editContent,
      },
      token: userData?.access_token,
    };

    //순서 지켜서 서버와 클라이언트 데이터 불일치 막기
    updateComment(data);

    //이름 저장시 잠시 이전 이름이 노출되는 이슈 해결차 추가
    {
      reply?.comment_id ? setReplyContent?.(editContent) : setCommentContent?.(editContent);
    }

    setEditComment?.(false);
  }, [
    blogCommentInfo.content,
    comment?._id,
    isNotLoggedIn,
    regexEditComment,
    regexTaggedNickname,
    reply?._id,
    reply?.comment_id,
    setCommentContent,
    setEditComment,
    setReplyContent,
    updateComment,
    userData?.access_token,
  ]);

  //댓글or답글 수정 취소
  const onClickEditCancel = useCallback(() => {
    setEditComment?.(false);
  }, [setEditComment]);

  return (
    <BlogPostCommentWritePresenter
      textareaRef={textareaRef}
      isNotLoggedIn={isNotLoggedIn}
      blogCommentInfo={blogCommentInfo}
      writeReply={writeReply}
      editComment={editComment}
      onSubmit={onSubmit}
      onChangeComment={onChangeComment}
      onClickReply={onClickReply}
      onClickReplyCancel={onClickReplyCancel}
      onClickEditCancel={onClickEditCancel}
      onClickEditSave={onClickEditSave}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      createCommentError={createCommentError}
      createReplyError={createReplyError}
      updateCommentError={updateCommentError}
    />
  );
};

export default BlogPostCommentWriteContainer;
