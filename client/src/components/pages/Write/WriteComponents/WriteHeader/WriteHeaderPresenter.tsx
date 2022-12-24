import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import { StyledDropdownMsg, StyledWriteHeader } from './WriteHeaderStyle';
import useOnClickOutside from '@hooks/useOnClickOutside';
import useAnimation from '@hooks/useAnimation';

interface Props {
  blogPostInfo: BlogPostReq;
  currTag: string;
  onChangeTitleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTagInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitTag: (e: FormEvent<HTMLFormElement>) => void;
  onClickTag: (tag: string) => void;
}

const WriteHeaderPresenter = ({
  blogPostInfo,
  currTag,
  onChangeTitleInput,
  onChangeTagInput,
  onClickTag,
  onSubmitTag,
}: Props) => {
  const { title, tags } = blogPostInfo;
  const [isOpen, setOpen] = useState(false);
  const dropdownBoxRef = useRef(null);

  //Dropdown Tag msg
  const onClickTagInput = useCallback(() => {
    if (!isOpen) setOpen(true);
  }, [isOpen]);

  //Dropdown Tag msg
  const onClickOutside = useCallback(() => {
    setOpen(false);
  }, []);

  //Dropdown Tag msg
  useOnClickOutside(dropdownBoxRef, onClickOutside);

  //Dropdown Tag msg with animation
  const [show, render, onAnimationEnd] = useAnimation(isOpen);

  return (
    <StyledWriteHeader>
      {/* 블로그 제목 */}
      <input type="text" name="title" value={title} onChange={onChangeTitleInput} placeholder="Title" />

      {/* 블로그 태그 그룹 */}
      <div className="write-header-tag-group">
        {/* 블로그 태그 */}
        <ul>
          {tags?.map((tag, i) => (
            <li key={i} onClick={() => onClickTag(tag)}>
              {tag}
            </li>
          ))}
        </ul>

        {/* 블로그 태그 입력 */}
        <form onSubmit={onSubmitTag}>
          <input
            type="text"
            value={currTag}
            onChange={onChangeTagInput}
            onClick={onClickTagInput}
            placeholder="Add tag"
            ref={dropdownBoxRef}
          />
        </form>

        {/* 블로그 태그 메세지 */}
        {render && (
          <StyledDropdownMsg animationName={show ? 'down-msg' : 'up-msg'} onAnimationEnd={() => onAnimationEnd}>
            엔터를 입력하여 태그를 등록 할 수 있습니다.
            <br />
            등록된 태그는 클릭하여 삭제할 수 있습니다.
          </StyledDropdownMsg>
        )}
      </div>
    </StyledWriteHeader>
  );
};

export default WriteHeaderPresenter;
