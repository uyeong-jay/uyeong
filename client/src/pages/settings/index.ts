import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Settings';

export interface CloudinaryTypes {
  uploadPreset: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadApi: string;
  deleteApi: string;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
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

  await Promise.all(getRunningOperationPromises());

  return {
    props: { cloudinaryConfig },
  };
});
