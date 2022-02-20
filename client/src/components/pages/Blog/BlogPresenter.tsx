import Link from 'next/link';
import { BlogProps } from '@_types/types-blog';

const BlogPresenter = ({ posts, title, description }: BlogProps) => {
  return (
    <div>
      {!posts && <div>No Posts!</div>}
      <h3>My Blog</h3>
      <p>{title}</p>
      <p>{description}</p>
      <ul>
        {posts &&
          posts.map(({ slug, title, description /* date, tags */ }) => {
            return (
              <article key={slug}>
                <Link href={`/blog/post/${slug}`}>
                  <a>{title}</a>
                </Link>
                <p>{description}</p>
                {/* <p>{date}</p> */}
                {/* <p>{tags}</p> */}
              </article>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPresenter;
