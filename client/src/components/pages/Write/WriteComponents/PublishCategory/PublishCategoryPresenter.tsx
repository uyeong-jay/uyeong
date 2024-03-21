import { DIV, LI } from './PublishCategoryStyle';
import useAnimation from '@hooks/useAnimation';
import { BlogCategoryRes } from '@app/services/blog/categoryApi';
import { MouseEventHandler } from 'react';
import { BlogPostReq } from '@app/services/blog/postApi';
import ListIcon from '@icons/ListIcon';
import CheckIcon from '@icons/CheckIcon';
import ArrowDownIcon from '@icons/ArrowDownIcon';

interface Props {
  blogCategoryData?: BlogCategoryRes;
  blogPostInfo: BlogPostReq;
  isOpenedCategory: boolean;
  onClickChooseCtegory: () => void;
  onClickCategory: MouseEventHandler<HTMLLIElement>;
}

const PublishCategoryPresenter = ({
  blogCategoryData,
  blogPostInfo,
  isOpenedCategory,
  onClickChooseCtegory,
  onClickCategory,
}: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isOpenedCategory);

  return (
    <DIV.PublishCategory isOpenedCategory={isOpenedCategory}>
      <div>
        <div>
          <span>[</span>
          <span>
            {blogPostInfo.category ? (
              blogPostInfo.category
            ) : (
              <>
                <ListIcon /> Select a category
              </>
            )}
          </span>
          <span>]</span>
        </div>
        {render && (
          <DIV.OpenedCategory
            animationName={show ? 'down-category' : 'up-category'}
            onAnimationEnd={() => onAnimationEnd}
          >
            {/* 카테고리 옵션 */}
            <ul>
              {blogCategoryData?.categories?.map((category) => (
                <LI.CategoryList
                  isCategoryClicked={category.name === blogPostInfo.category ? true : false}
                  key={category._id}
                  value={category.name}
                  onClick={onClickCategory}
                >
                  {category.name}
                  {category.name === blogPostInfo.category ? <CheckIcon /> : <></>}
                </LI.CategoryList>
              ))}
            </ul>
          </DIV.OpenedCategory>
        )}
        <button type="button" onClick={onClickChooseCtegory}>
          <ArrowDownIcon />
        </button>
      </div>
    </DIV.PublishCategory>
  );
};

export default PublishCategoryPresenter;
