import { BlogPostReq } from '@app/services/blog/blogPostApi';
import validFile from '@utils/valid/validFile';
import { ChangeEvent, useCallback, useState } from 'react';
import PublishPreviewPresenter from './PublishPreviewPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishPreviewContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const [fileObj, setFileObj] = useState<File>();

  const onChangeThumbnail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //파일 에러
      validFile(file);

      if (file) {
        // URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
        setFileObj(file);

        setBlogPostInfo({ ...blogPostInfo, content: 'file' });
      }
    },
    [blogPostInfo, setBlogPostInfo],
  );

  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setBlogPostInfo({ ...blogPostInfo, description: e.target.value });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return (
    <PublishPreviewPresenter
      blogPostInfo={blogPostInfo}
      fileObj={fileObj}
      onChangeThumbnail={onChangeThumbnail}
      onChangeTextarea={onChangeTextarea}
    />
  );
};

export default PublishPreviewContainer;
