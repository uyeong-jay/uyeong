import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { BlogPostReq } from '@app/services/blog/postApi';
import { DIV } from './WriteHeaderStyle';
import useOnClickOutside from '@hooks/useOnClickOutside';
import useAnimation from '@hooks/useAnimation';

interface Props {
  blogPostInfo: BlogPostReq;
  currTag: string;
  onChangeTitleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTagInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitTag: (e: FormEvent<HTMLFormElement>) => void;
  onClickTag: (tag: string) => void;
  isOver20Tags: boolean;
  setOver20Tags: (isOver20Tags: boolean) => void;
}

const WriteHeaderPresenter = ({
  blogPostInfo,
  currTag,
  onChangeTitleInput,
  onChangeTagInput,
  onSubmitTag,
  onClickTag,
  isOver20Tags,
  setOver20Tags,
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

    // 태그 외부 클릭시 메세지 내용이 바로 바뀌는게 보이지 않도록 타이머 추가
    const timer = setTimeout(() => {
      setOver20Tags(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [setOver20Tags]);

  //Dropdown Tag msg
  useOnClickOutside(dropdownBoxRef, onClickOutside);

  //Dropdown Tag msg with animation
  const [show, render, onAnimationEnd] = useAnimation(isOpen);

  return (
    <DIV.WriteHeader>
      {/* 블로그 제목 */}
      <input type="text" name="title" value={title} onChange={onChangeTitleInput} placeholder="Title" />

      <DIV.WriteHeaderTagGroup>
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
          {/* 블로그 태그 메세지 */}
          {render && (
            <DIV.DropdownMsg animationName={show ? 'down-msg' : 'up-msg'} onAnimationEnd={() => onAnimationEnd}>
              {isOver20Tags
                ? 'You can add up to 20 tags.'
                : "You can add a tag by pressing 'Enter'." + '\n' + 'And the tag can be deleted by clicking on them.'}
            </DIV.DropdownMsg>
          )}
        </form>
      </DIV.WriteHeaderTagGroup>
    </DIV.WriteHeader>
  );
};

export default WriteHeaderPresenter;
