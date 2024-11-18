import { useEffect, useState } from 'react';
import WritePresenter from './WritePresenter';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { BlogPostReq, useGetBlogPostsQuery } from '@app/services/blog/postApi';
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
  const { data: blogPostsData } = useGetBlogPostsQuery();
  const isPublishing = useAppSelector((state) => state.write.isPublishing);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { id } = router.query;

  const initialState = {
    title: '',
    tags: [],
    content: '',
    thumbnail: '',
    description: '',
    category: '',
    privacy: false,
  };

  const [blogPostInfo, setBlogPostInfo] = useState<BlogPostReq | null>(initialState);

  //post 업데이트 시
  useEffect(() => {
    if (id) {
      const postData = blogPostsData?.posts?.find((v) => v._id === id);

      if (!postData) setBlogPostInfo(null);

      dispatch(getPostById(postData));

      const { title, tags, content, thumbnail, description, category, privacy } = postData || ({} as BlogPostReq);

      setBlogPostInfo({
        title,
        tags,
        content,
        thumbnail,
        description,
        category,
        privacy,
      });
    }
  }, [blogPostsData?.posts, dispatch, id]);

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
          blogPostsData={blogPostsData}
          blogPostInfo={blogPostInfo}
          setBlogPostInfo={setBlogPostInfo}
          cloudinaryConfig={cloudinaryConfig}
        />
      )}
    </>
  );
};

export default WriteContainer;
