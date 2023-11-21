import { DIV, HEADER } from './BlogPostHeaderStyle';
import formatDate from '@utils/formatDate';
import { BlogPost } from '@app/services/blog/postApi';
import Link from 'next/link';
import Modal from '@modals/Modal';
import { UserResponse } from '@app/services/user/userApi';
import Button from '@atoms/Button';

interface Props {
  userData?: UserResponse;
  blogPost?: BlogPost;
  onClickDeletePost: (isCallback?: boolean) => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

const BlogPostHeaderPresenter = ({ userData, blogPost, onClickDeletePost, isModalOpen, setModalOpen }: Props) => {
  const { _id, title, category, createdAt, tags } = blogPost || {};

  return (
    <>
      <HEADER.Frame id="blog-post-header-frame">
        {/* 제목 글씨체 바꾸기 */}
        <DIV.TitleWrapper>
          <h1>{title && title.charAt(0).toUpperCase() + title.slice(1)}</h1>
        </DIV.TitleWrapper>

        {userData?.user?.role === 'admin' ? (
          <DIV.EditButtonGroup>
            <Link href={`/write?id=${_id}`} passHref>
              <Button variant="update" text="수정" />
            </Link>
            <Button variant="delete" text="삭제" onClick={() => onClickDeletePost()} />
          </DIV.EditButtonGroup>
        ) : (
          <></>
        )}
        <DIV.Middle category={category}>
          {category ? <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span> : <span></span>}
          <span>{formatDate(createdAt as string)}</span>
        </DIV.Middle>

        <DIV.Bottom>
          {/* 둥글게 */}
          {tags?.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </DIV.Bottom>
      </HEADER.Frame>
      <Modal
        type="delete"
        msg="Are you sure you want to delete this post?"
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        callback={() => onClickDeletePost(true)}
      />
    </>
  );
};

export default BlogPostHeaderPresenter;
