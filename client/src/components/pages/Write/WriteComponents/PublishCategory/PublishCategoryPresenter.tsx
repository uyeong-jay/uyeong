import { StyledOpenedCategory, StyledPublishCategory } from './PublishCategoryStyle';
import useAnimation from '@hooks/useAnimation';
import { BlogCategoryRes } from '@app/services/blog/blogCategoryApi';
import { MouseEventHandler } from 'react';

interface Props {
  blogCategoryData: BlogCategoryRes | undefined;
  isOpenedCtegory: boolean;
  onClickChooseCtegory: () => void;
  onClickCancel: () => void;
  onClickDone: () => void;
  onClickCategory: MouseEventHandler<HTMLLIElement>;
}

const PublishCategoryPresenter = ({
  blogCategoryData,
  isOpenedCtegory,
  onClickChooseCtegory,
  onClickCancel,
  onClickDone,
  onClickCategory,
}: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isOpenedCtegory);

  return (
    <StyledPublishCategory>
      <button type="button" onClick={onClickChooseCtegory}>
        <i className="fa-solid fa-list"></i> Choose a category
      </button>
      {render && (
        <StyledOpenedCategory
          animationName={show ? 'down-category' : 'up-category'}
          onAnimationEnd={() => onAnimationEnd}
        >
          {/* 취소 버튼 */}
          <button className="cancel-button" type="button" onClick={onClickCancel}>
            <i className="fa-solid fa-xmark fa-2x"></i>
          </button>

          {/* 카테고리 옵션 */}
          <ul className="category-list-block">
            {blogCategoryData?.categories?.map((category) => (
              <li key={category._id} value={category.name} onClick={onClickCategory}>
                {category.name}
              </li>
            ))}
          </ul>

          {/* 완료 버튼 */}
          <div className="button-wrapper">
            <button className="done-button" type="button" onClick={onClickDone}>
              Done
            </button>
          </div>
        </StyledOpenedCategory>
      )}
    </StyledPublishCategory>
  );
};

export default PublishCategoryPresenter;
