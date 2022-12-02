import { useState } from 'react';
import { useGetUserDataQuery } from '@app/services/userApi';
import WritePresenter from './WritePresenter';

const WriteContainer = () => {
  const { data: userData } = useGetUserDataQuery();

  const initialState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumnail: '',
    category: '',
    createdAt: new Date().toISOString(), //2022-11-29T17:35:07.526Z
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [blog, setBlog] = useState(initialState);

  return <WritePresenter userData={userData} />;
};

export default WriteContainer;
