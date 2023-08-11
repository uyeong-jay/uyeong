import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLE, DIV, P } from './BlogPostCardStyle';
import { BlogPost } from '@app/services/blog/postApi';
import formatDate from '@utils/formatDate';
import { BlogCommentRes } from '@app/services/blog/commentApi';

interface Props {
  post: BlogPost;
  blogCommentsData?: BlogCommentRes;
}

const BlogPostCardPresenter = ({ post, blogCommentsData }: Props) => {
  const { /* _id, */ titleForUrl, title, tags, content, thumbnail, description, /* privacy, */ createdAt, category } =
    post;

  const cardDescription = useMemo(() => {
    const cutText = description ? description.slice(0, 100) : content.slice(0, 100);

    const finalDescription = description.length > 100 || content.length > 100 ? cutText + '...' : cutText;

    return finalDescription;
  }, [content, description]);

  const cardTitle = useMemo(() => {
    const cutTitle = title.slice(0, 30);

    const finalTitle = title.length > 30 ? cutTitle + '...' : cutTitle;

    return finalTitle;
  }, [title]);

  const { count } = blogCommentsData || ({} as BlogCommentRes);

  return (
    <ARTICLE.Frame>
      <DIV.Title thumbnail={thumbnail}>
        <h3>
          <Link href={`/blog/${titleForUrl}`}>{cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1)}</Link>
        </h3>
        {thumbnail && (
          <div className="blog-card-image-wrapper blog-card-image">
            {<Image className="blog-card-image" src={thumbnail as string} alt="blog-card-image" layout="fill" />}
          </div>
        )}
      </DIV.Title>

      <DIV.Content thumbnail={thumbnail}>
        <DIV.ContentTop>
          {category && <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>}
        </DIV.ContentTop>

        <DIV.ContentMiddle thumbnail={thumbnail}>
          {tags.length ? <P.CardTags>{tags}</P.CardTags> : <></>}
          {tags.length ? <DIV.MidLine thumbnail={thumbnail}></DIV.MidLine> : <></>}
          <P.CardDescription>{cardDescription}</P.CardDescription>
        </DIV.ContentMiddle>

        <DIV.ContentBottom>
          <P.CardDate>{formatDate(createdAt)}</P.CardDate>
          <P.CardComment>{count ? count : '0'} Comments</P.CardComment>
        </DIV.ContentBottom>
      </DIV.Content>
    </ARTICLE.Frame>
  );
};

export default BlogPostCardPresenter;
