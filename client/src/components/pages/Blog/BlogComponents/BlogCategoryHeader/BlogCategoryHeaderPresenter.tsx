import { UserResponse } from '@app/services/user/userApi';
import Button from '@atoms/Button';
import InputBox from '@molecules/InputBox';
import React, { ChangeEvent, FormEvent } from 'react';
import { FORM } from './BlogCategoryHeaderStyle';

interface Props {
  userData?: UserResponse;
  categoryInfo: { name: string };
  error: any;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeCategoryName: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BlogCategoryHeaderPresenter = ({ userData, categoryInfo, error, onSubmit, onChangeCategoryName }: Props) => {
  const { name } = categoryInfo;

  return (
    <>
      {/* 카테고리 생성 바 (admin) */}
      {userData?.user?.role === 'admin' && (
        <FORM.CategoryNameFrom onSubmit={onSubmit}>
          <InputBox name="category" value={name} onChange={onChangeCategoryName} />
          <Button variant="create" type="submit" text="Create" />
          {/* 에러 메세지 */}
          {error && <p>{error.data.msg}</p>}
        </FORM.CategoryNameFrom>
      )}
    </>
  );
};

export default BlogCategoryHeaderPresenter;
