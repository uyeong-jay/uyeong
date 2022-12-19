import { ChangeEvent, useCallback, useState } from 'react';
import WritePresenter from './WritePresenter';
import { useGetUserDataQuery } from '@app/services/user/userApi';

const WriteContainer = () => {
  const { data: userData } = useGetUserDataQuery();

  const initialState = {
    user: '',
    title: '', //o
    tags: [''],
    content: ``, //o
    thumbnail: '', //o
    description: '', //o
    category: '', //o
    createdAt: new Date().toISOString(), //2022-11-29T17:35:07.526Z
  };
  const [blogPostInfo, setBlogPostInfo] = useState(initialState);

  const onChangeTitleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBlogPostInfo({ ...blogPostInfo, title: e.target.value });
    },
    [blogPostInfo],
  );

  return (
    <WritePresenter
      userData={userData}
      blogPostInfo={blogPostInfo}
      setBlogPostInfo={setBlogPostInfo}
      onChangeTitleInput={onChangeTitleInput}
    />
  );
};

export default WriteContainer;
