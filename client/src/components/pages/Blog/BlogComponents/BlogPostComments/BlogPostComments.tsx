import { BlogCommentRes } from '@app/services/blog/commentApi';
import React from 'react';
import BlogPostComment from '../BlogPostComment';
import styled from '@_settings/styled';
import { useGetUserDataQuery } from '@app/services/user/userApi';

interface Props {
  postId?: string;
  blogCommentsData?: BlogCommentRes;
}

const DIV = {} as any;

DIV.CommentMdViewerGroup = styled.div`
  // border: 1px solid blue;
`;

const BlogPostComments = ({ postId, blogCommentsData }: Props) => {
  const { data: userData } = useGetUserDataQuery();

  return (
    <DIV.CommentMdViewerGroup>
      {blogCommentsData?.comments?.map((comment) => (
        <BlogPostComment key={comment._id} userData={userData} postId={postId} comment={comment} />
      ))}
    </DIV.CommentMdViewerGroup>
  );
};

export default BlogPostComments;
