import { UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import WriteMDEditer from '../WriteComponents/WriteMDEditer';
import WriteMDViewer from '../WriteComponents/WriteMDViewer';
import { StyledWrite } from './WriteStyle';
import { useScrollBlock } from '@hooks/useScrollBlock';
import WriteMDFooter from '../WriteComponents/WriteMDFooter';
import { ChangeEvent } from 'react';
import Head from 'next/head';
import { BlogPostReq } from '@app/services/blog/blogPostApi';

interface Props {
  userData: UserResponse | undefined;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  onChangeTitleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePresenter = ({ userData, blogPostInfo, setBlogPostInfo, onChangeTitleInput }: Props) => {
  useScrollBlock();

  const { title /* tags */ } = blogPostInfo;

  if (userData?.user?.role !== 'admin') return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Write</title>
      </Head>
      <StyledWrite>
        <div className="write-right-group">
          <input type="text" name="title" value={title} onChange={onChangeTitleInput} placeholder="Title" />
          <input placeholder="Tags" />
          <WriteMDEditer blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
        </div>
        <WriteMDViewer blogPostInfo={blogPostInfo} />
        <WriteMDFooter blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
      </StyledWrite>
    </>
  );
};

export default WritePresenter;
