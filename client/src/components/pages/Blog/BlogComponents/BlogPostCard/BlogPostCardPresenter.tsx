import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLE, DIV, P } from './BlogPostCardStyle';
import { BlogPost } from '@app/services/blog/postApi';
import formatDate from '@utils/formatDate';
import removeMd from 'remove-markdown';

interface Props {
  post: BlogPost;
}

const BlogPostCardPresenter = ({ post }: Props) => {
  const {
    /* _id, */ titleForUrl,
    title,
    tags,
    content,
    thumbnail,
    description,
    /* privacy, */ createdAt,
    category,
    commentCount,
  } = post;

  // 설명 , 내용 모두 200자만 제한해서 보여주기
  const cardContent = useMemo(() => {
    const editContent = content.slice(0, 200);
    return removeMd(editContent);
  }, [content]);

  return (
    <ARTICLE.Frame>
      <DIV.Title thumbnail={thumbnail}>
        <h3>
          <Link href={`/blog/${titleForUrl}`}>{title.charAt(0).toUpperCase() + title.slice(1)}</Link>
        </h3>
        {thumbnail && (
          <div className="blog-card-image-wrapper blog-card-image">
            {
              <Image
                className="blog-card-image"
                src={thumbnail as string}
                alt="blog-card-image"
                layout="fill"
                objectFit="cover"
              />
            }
          </div>
        )}
      </DIV.Title>

      <DIV.Content thumbnail={thumbnail}>
        <DIV.ContentTop>
          {category && <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>}
        </DIV.ContentTop>

        <DIV.ContentMiddle thumbnail={thumbnail}>
          {tags.length ? (
            <DIV.CardTags thumbnail={thumbnail}>
              <p>
                {tags.map((tag) => (
                  <span key={tag}>
                    <span>#</span>
                    {tag}
                  </span>
                ))}
              </p>
            </DIV.CardTags>
          ) : (
            <></>
          )}
          {tags.length ? <DIV.MidLine thumbnail={thumbnail}></DIV.MidLine> : <></>}
          <DIV.CardDescription thumbnail={thumbnail}>
            <p>{description ? cardContent : cardContent}</p>
          </DIV.CardDescription>
        </DIV.ContentMiddle>

        <DIV.ContentBottom>
          <P.CardDate>{formatDate(createdAt)}</P.CardDate>
          <P.CardComment>{commentCount} Comments</P.CardComment>
        </DIV.ContentBottom>
      </DIV.Content>
    </ARTICLE.Frame>
  );
};

export default BlogPostCardPresenter;
