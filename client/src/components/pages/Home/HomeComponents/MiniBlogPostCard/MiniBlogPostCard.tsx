import styled from '@_settings/styled';
import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import Image from 'next/image';

interface Props {
  post: BlogPost;
}

const DIV = {} as any;
const P = {} as any;

DIV.Layout = styled.div`
  // border: 1px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 230px; //3(가):2(세)
  height: 230px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px 15px;

  & img {
    border-radius: 10px;
  }
`;

P.SlickPostTitle = styled.p`
  font-size: 20px;
`;

P.SlickPostCategory = styled.p``;

const MiniBlogPostCard = ({ post }: Props) => {
  const {
    // _id,
    // titleForUrl,
    title,
    // tags,
    // content,
    thumbnail,
    // description,
    // privacy,
    // createdAt,
    category,
  } = post;

  return (
    <DIV.Layout>
      {thumbnail && <Image src={thumbnail as string} alt="post-image" width={200} height={135} />}
      <P.SlickPostTitle>{title}</P.SlickPostTitle>
      <P.SlickPostCategory>{category}</P.SlickPostCategory>
    </DIV.Layout>
  );
};

export default MiniBlogPostCard;
