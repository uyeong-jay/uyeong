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
    /* _id, */
    titleForUrl,
    title,
    tags,
    content,
    thumbnail,
    description,
    createdAt,
    category,
    commentCount,
    privacy,
  } = post;

  // 보여줄 내용 200자 제한
  const cardContent = useMemo(() => {
    const slicedContent = content.slice(0, 200);
    return removeMd(slicedContent);
  }, [content]);

  return (
    <ARTICLE.Frame>
      <DIV.Lock>{privacy && <span>Private</span>}</DIV.Lock>
      <DIV.Title thumbnail={thumbnail}>
        <h3>
          <Link href={`/blog/${titleForUrl}`}>{title.charAt(0).toUpperCase() + title.slice(1)}</Link>
        </h3>
        <Link href={`/blog/${titleForUrl}`}>
          {thumbnail && (
            <div className="blog-card-image-wrapper blog-card-image">
              {
                <Image
                  className="blog-card-image"
                  src={thumbnail as string}
                  alt="blog-card-image"
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              }
            </div>
          )}
        </Link>
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
            <p>{description ? description : cardContent}</p>
          </DIV.CardDescription>
        </DIV.ContentMiddle>

        <DIV.ContentBottom>
          <P.CardDate>{formatDate(createdAt)}</P.CardDate>
          <P.CardComment>{commentCount > 1 ? `${commentCount} Comments` : `${commentCount} Comment`}</P.CardComment>
        </DIV.ContentBottom>
      </DIV.Content>
    </ARTICLE.Frame>
  );
};

export default BlogPostCardPresenter;
