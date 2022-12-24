import { useState } from 'react';
import WritePresenter from './WritePresenter';
import { useGetUserDataQuery } from '@app/services/user/userApi';

const WriteContainer = () => {
  const { data: userData } = useGetUserDataQuery();

  const initialState = {
    user: '',
    title: '', //o
    tags: [] as string[], //o
    content: ``, //o
    thumbnail: '', //o
    description: '', //o
    category: '', //o
    createdAt: new Date().toISOString(), //2022-11-29T17:35:07.526Z //o
  };
  const [blogPostInfo, setBlogPostInfo] = useState(initialState);

  return <WritePresenter userData={userData} blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />;
};

export default WriteContainer;
