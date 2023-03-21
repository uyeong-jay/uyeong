import { StyledBlogPostHeader } from './BlogPostHeaderStyle';
import formatDate from '@utils/formatDate';
import { BlogPost } from '@app/services/blog/postApi';
import Link from 'next/link';
import Modal from '@modals/Modal';

interface Props {
  blogPost?: BlogPost;
  onClickDeletePost: (isCallback?: boolean) => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

const BlogPostHeaderPresenter = ({ blogPost, onClickDeletePost, isModalOpen, setModalOpen }: Props) => {
  const { _id, title, category, createdAt, tags } = blogPost || {};

  return (
    <StyledBlogPostHeader>
      {/* 제목 글씨체 바꾸기 */}
      <h1>{title}</h1>
      <div>
        <Link href={`/write?id=${_id}`}>수정</Link>
        <button onClick={() => onClickDeletePost()}>삭제</button>
      </div>
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
      <Modal
        type="delete"
        msg="Are you sure you want to delete this post?"
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        callback={() => onClickDeletePost(true)}
      />
    </StyledBlogPostHeader>
  );
};

export default BlogPostHeaderPresenter;
