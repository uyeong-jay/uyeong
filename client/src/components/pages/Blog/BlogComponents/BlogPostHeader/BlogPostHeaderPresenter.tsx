import { StyledBlogPostHeader } from './BlogPostHeaderStyle';
import formatDate from '@utils/formatDate';
import { BlogPost } from '@app/services/blog/postApi';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostHeaderPresenter = ({ blogPost }: Props) => {
  const { title, category, createdAt, tags } = blogPost || {};
  return (
    <StyledBlogPostHeader>
      {/* 제목 글씨체 바꾸기 */}
      <h1>{title}</h1>
      <div className="blog-post-header-middle">
        {/* 양쪽으로 */}
        {/* 글씨만 */}
        {category && <p>{category}</p>}
        <p>{formatDate(createdAt as string)}</p>
      </div>
      <div className="blog-post-header-bottom">
        {/* 둥글게 */}
        {tags?.map((tag, index) => (
          //tag 이모티콘 씌우기
          <div className="blog-post-tag" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </StyledBlogPostHeader>
  );
};

export default BlogPostHeaderPresenter;
