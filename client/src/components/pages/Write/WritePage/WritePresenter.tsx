import Head from 'next/head';
import { BlogPostReq, BlogPostRes } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import WriteHeader from '../WriteComponents/WriteHeader';
import WriteMDEditer from '../WriteComponents/WriteMDEditer';
import WriteMDViewer from '../WriteComponents/WriteMDViewer';
import WriteFooter from '../WriteComponents/WriteFooter';
import NotFound from '@src/pages/404';
import { DIV } from './WriteStyle';
import useScrollBlock from '@hooks/useScrollBlock';

interface Props {
  userData?: UserResponse;
  blogPostsData?: BlogPostRes;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WritePresenter = ({ userData, blogPostsData, blogPostInfo, setBlogPostInfo }: Props) => {
  useScrollBlock();

  if (userData?.user?.role !== 'admin') return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Write</title>
      </Head>
      <DIV.WriteFrame>
        <DIV.WriteLeftGroup>
          <WriteHeader blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
          <WriteMDEditer blogPostContent={blogPostInfo.content} setBlogPostInfo={setBlogPostInfo} />
          <WriteFooter
            userData={userData}
            blogPostInfo={blogPostInfo}
            blogPostsData={blogPostsData}
            setBlogPostInfo={setBlogPostInfo}
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
