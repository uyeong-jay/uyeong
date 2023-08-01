import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLE, DIV, P } from './BlogPostCardStyle';
import { BlogPost } from '@app/services/blog/postApi';
import formatDate from '@utils/formatDate';

interface Props {
  post: BlogPost;
}

const BlogPostCardPresenter = ({ post }: Props) => {
  const {
    /* _id, */ titleForUrl,
    title,
    tags,
    /* content,  */ thumbnail,
    description,
    /* privacy, */ createdAt,
    category,
  } = post;

  // console.log('tags:', tags, !!tags.length, 'description:', !!description);

  return (
    <ARTICLE.Frame>
      <DIV.Title>
        <h3>
          <Link href={`/blog/${titleForUrl}`}>{title}</Link>
        </h3>
        {thumbnail && (
          <div className="blog-card-image-wrapper blog-card-image">
            {
              <Image
                className="blog-card-image"
                src={thumbnail as string}
                alt="blog-card-image"
                width={280}
                height={185}
              />
            }
          </div>
        )}
      </DIV.Title>

      <DIV.Content thumbnail={thumbnail}>
        <DIV.ContentTop>{category && <p>{category}</p>}</DIV.ContentTop>

        <DIV.ContentMiddle>
          {tags.length ? <P.CardTags>{tags}</P.CardTags> : <></>}
          {tags.length && description ? <DIV.MidLine></DIV.MidLine> : <></>}
          {description && <P.CardDescription>{description}</P.CardDescription>}
        </DIV.ContentMiddle>

        <DIV.ContentBottom>
          <P.CardDate>{formatDate(createdAt)}</P.CardDate>
          <P.CardComment>ㅁ개의 댓글</P.CardComment>
        </DIV.ContentBottom>
      </DIV.Content>
    </ARTICLE.Frame>
  );
};

export default BlogPostCardPresenter;
