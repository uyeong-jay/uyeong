import Head from 'next/head';
import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import WriteHeader from '../WriteComponents/WriteHeader';
import WriteMDEditer from '../WriteComponents/WriteMDEditer';
import WriteMDViewer from '../WriteComponents/WriteMDViewer';
import WriteFooter from '../WriteComponents/WriteFooter';
import NotFound from '@src/pages/404';
import { DIV } from './WriteStyle';
import useScrollBlock from '@hooks/useScrollBlock';
import { CloudinaryTypes } from '@src/pages/settings';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  cloudinaryConfig: CloudinaryTypes;
}

const WritePresenter = ({ userData, blogPostInfo, setBlogPostInfo, cloudinaryConfig }: Props) => {
  useScrollBlock();

  if (userData?.user?.role !== 'admin') return <NotFound />;
  return (
    <>
      <Head>
        <title>{`UYeong | ${!blogPostInfo.title ? 'New Post' : 'Writing...'}`}</title>
      </Head>
      <DIV.WriteFrame>
        <DIV.WriteLeftGroup>
          <WriteHeader blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
          <WriteMDEditer blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
          <WriteFooter
            userData={userData}
            blogPostInfo={blogPostInfo}
            setBlogPostInfo={setBlogPostInfo}
            cloudinaryConfig={cloudinaryConfig}
          />
        </DIV.WriteLeftGroup>
        <DIV.WriteRightGroup>
          <WriteMDViewer blogPostContent={blogPostInfo.content} />
        </DIV.WriteRightGroup>
      </DIV.WriteFrame>
    </>
  );
};

export default WritePresenter;
