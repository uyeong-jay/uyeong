import styled from '@_settings/styled';
import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: BlogPost;
}

const DIV = {} as any;
const P = {} as any;
const IMG = {} as any;

DIV.Layout = styled.div`
  // border: 1px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%; //3(가):2(세)
  height: 200px;
  // margin: 10px auto;
  padding: 10px 15px;
`;

P.SlickPostTitle = styled.p`
  // border: 1px solid black;
  width: 100%;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > a {
    // border: 1px solid black;
    color: #333333;
    margin-left: 3px;
    overflow: hidden;
  }
`;

IMG.PostImage = styled(Image)`
  border-radius: 10px;
`;

P.SlickPostCategory = styled.p`
  // border: 1px solid black;
  color: #333333;
  margin-left: 5px;
`;

const MiniBlogPostCard = ({ post }: Props) => {
  const {
    // _id,
    titleForUrl,
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
      {thumbnail && (
        <Link href={`/blog/${titleForUrl}`} rel="noopener noreferrer" passHref>
          <a>
            <IMG.PostImage src={thumbnail as string} alt="post-image" width={200} height={135} priority />
          </a>
        </Link>
      )}
      <P.SlickPostTitle>
        <Link href={`/blog/${titleForUrl}`} rel="noopener noreferrer">
          {title}
        </Link>
      </P.SlickPostTitle>
      <P.SlickPostCategory>{category}</P.SlickPostCategory>
    </DIV.Layout>
  );
};

export default MiniBlogPostCard;
