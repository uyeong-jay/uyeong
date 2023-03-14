import { StyledOpenedCategory, StyledPublishCategory } from './PublishCategoryStyle';
import useAnimation from '@hooks/useAnimation';
import { BlogCategoryRes } from '@app/services/blog/categoryApi';
import { MouseEventHandler } from 'react';
import { BlogPostReq } from '@app/services/blog/postApi';
import ListIcon from '@icons/ListIcon';
import CheckIcon from '@icons/CheckIcon';

interface Props {
  blogCategoryData?: BlogCategoryRes;
  blogPostInfo: BlogPostReq;
  isOpenedCategory: boolean;
  // isClickedCategory: boolean;
  onClickChooseCtegory: () => void;
  // onClickCancel: () => void;
  onClickDone: () => void;
  onClickCategory: MouseEventHandler<HTMLLIElement>;
}

const PublishCategoryPresenter = ({
  blogCategoryData,
  blogPostInfo,
  isOpenedCategory,
  // isClickedCategory,
  onClickChooseCtegory,
  // onClickCancel,
  onClickDone,
  onClickCategory,
}: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isOpenedCategory);

  return (
    <StyledPublishCategory>
      <button type="button" onClick={onClickChooseCtegory}>
        <ListIcon />
        Choose a category
      </button>
      {render && (
        <StyledOpenedCategory
          animationName={show ? 'down-category' : 'up-category'}
          onAnimationEnd={() => onAnimationEnd}
        >
          {/* 카테고리 옵션 */}
          <ul className="category-list-block">
            {blogCategoryData?.categories?.map((category) => (
              <li key={category._id} value={category.name} onClick={onClickCategory}>
                {category.name}
                {/* isClickedCategory &&  */ category.name === blogPostInfo.category ? <CheckIcon /> : null}
              </li>
            ))}
          </ul>

          <div className="button-group">
            {/* 취소 버튼 */}
            {/* <button className="cancel-button" type="button" onClick={onClickCancel}>
              Cancel
            </button> */}

            {/* 완료 버튼 */}
            <button
              className="done-button"
              type="button"
              onClick={onClickDone}
              // style={isClickedCategory ? { backgroundColor: 'gray', border: 'none', color: 'white' } : undefined}
            >
              Done
            </button>
          </div>
        </StyledOpenedCategory>
      )}
    </StyledPublishCategory>
  );
};

export default PublishCategoryPresenter;
