import wrapper from '@app/store';
import { getRunningQueriesThunk } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { GetServerSideProps } from 'next';
import { getBlogPost } from '@app/services/blog/postApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Blog/BlogPage/BlogPost';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  const cloudinaryConfig = {
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    uploadApi: process.env.CLOUDINARY_UPLOAD_API,
    deleteApi: process.env.CLOUDINARY_DELETE_API,
  };

  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  store.dispatch(getBlogPost.initiate(params?.slug as string));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: { cloudinaryConfig },
  };
});
