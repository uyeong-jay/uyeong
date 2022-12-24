import Head from 'next/head';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import { UserResponse } from '@app/services/user/userApi';
import WriteHeader from '../WriteComponents/WriteHeader';
import WriteMDEditer from '../WriteComponents/WriteMDEditer';
import WriteMDViewer from '../WriteComponents/WriteMDViewer';
import WriteFooter from '../WriteComponents/WriteFooter';
import NotFound from '@src/pages/404';
import { StyledWrite } from './WriteStyle';
import useScrollBlock from '@hooks/useScrollBlock';

interface Props {
  userData: UserResponse | undefined;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WritePresenter = ({ userData, blogPostInfo, setBlogPostInfo }: Props) => {
  useScrollBlock();

  if (userData?.user?.role !== 'admin') return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Write</title>
      </Head>
      <StyledWrite>
        <div className="write-right-group">
          <WriteHeader blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
          <WriteMDEditer blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
          <WriteFooter blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
        </div>
        <div className="write-left-group">
          <WriteMDViewer blogPostInfo={blogPostInfo} />
        </div>
      </StyledWrite>
    </>
  );
};

export default WritePresenter;
