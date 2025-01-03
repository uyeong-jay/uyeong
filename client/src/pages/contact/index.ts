import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import { getRunningQueriesThunk } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Contact';

export interface EmailjsProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const emailjsConfig = {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  };

  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: { emailjsConfig },
  };
});
