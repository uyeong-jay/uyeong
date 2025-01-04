import styled from '@_settings/styled';
import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@icons/Logo';

interface Props {
  post: BlogPost;
}

const DIV = {} as any;
const P = {} as any;
const IMG = {} as any;

DIV.Frame = styled.div`
  // border: 1px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%; //3(가):2(세)
  height: 200px;
  padding: 10px 15px;

  & a {
    // border: 1px solid red;
    position: relative;
    width: 200px;
    height: 135px;

    //LOGO Wrapper
    & > div {
      border: 3px solid ${({ theme }) => theme.BD_C};
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & .logo {
        // border: 1px solid black;
        width: 30px;
        height: 60px;
        transform: translateY(7px);
        fill: ${({ theme }) => theme.LOGO_C};
      }
    }
  }
`;

P.PostTitle = styled.p`
  // border: 1px solid black;
  position: relative;
  width: 100%;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > a {
    // border: 1px solid green;
    margin-left: 3px;
    overflow: hidden;
    color: ${({ theme }) => theme.FONT_C};
  }
`;

IMG.PostImage = styled(Image)`
  border-radius: 10px;
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
    // category,
  } = post;

  return (
    <DIV.Frame>
      <Link href={`/blog/${titleForUrl}`} rel="noopener noreferrer" passHref>
        <a>
          {thumbnail ? (
            <IMG.PostImage
              src={thumbnail as string}
              alt="post-image"
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : (
            <div>
              <Logo />
            </div>
          )}
        </a>
      </Link>
      <P.PostTitle>
        <Link href={`/blog/${titleForUrl}`} rel="noopener noreferrer" passHref>
          {/* ellipsis color가 theme 변경시 적용 안됨: link(a) + ellipsis 사용시 a 내부에 span 태그를 추가 하여 color 전체 적용 */}
          <span>{title}</span>
        </Link>
      </P.PostTitle>
    </DIV.Frame>
  );
};

export default MiniBlogPostCard;
