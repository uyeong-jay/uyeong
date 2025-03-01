import { useEffect, useState } from 'react';
import WritePresenter from './WritePresenter';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { BlogPostReq, useGetBlogPostQuery } from '@app/services/blog/postApi';
import { useRouter } from 'next/router';
import NotFound from '@src/pages/404';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { cancelPublishing, getPostById, setFileUnchanged } from '../WriteSlice';
import { CloudinaryTypes } from '@src/pages/settings';

interface Props {
  cloudinaryConfig: CloudinaryTypes;
}

const WriteContainer = ({ cloudinaryConfig }: Props) => {
  const { data: userData } = useGetUserDataQuery();

  const router = useRouter();
  const { id } = router.query;
  const { data: blogPostData } = useGetBlogPostQuery(id as string);
  const { post } = blogPostData || {};

  const isPublishing = useAppSelector((state) => state.write.isPublishing);
  const dispatch = useAppDispatch();

  const initialState = {
    title: post?.title ?? '',
    tags: post?.tags ?? [],
    content: post?.content ?? '',
    thumbnail: post?.thumbnail ?? '',
    description: post?.description ?? '',
    category: post?.category ?? '',
    privacy: post?.privacy ?? false,
  };

  const [blogPostInfo, setBlogPostInfo] = useState<BlogPostReq | null>(initialState);

  //post 업데이트 시
  useEffect(() => {
    if (id) {
      dispatch(getPostById(post)); // update 와 post 버튼 구분
    }
  }, [dispatch, id, post]);

  useEffect(() => {
    //write page 언마운트시 실행
    return () => {
      if (isPublishing) {
        dispatch(setFileUnchanged());
        dispatch(cancelPublishing());
      }
    };
  }, [dispatch, isPublishing]);

  return (
    <>
      {!blogPostInfo ? (
        <NotFound />
      ) : (
        <WritePresenter
          userData={userData}
          blogPostInfo={blogPostInfo}
          setBlogPostInfo={setBlogPostInfo}
          cloudinaryConfig={cloudinaryConfig}
        />
      )}
    </>
  );
};

export default WriteContainer;
