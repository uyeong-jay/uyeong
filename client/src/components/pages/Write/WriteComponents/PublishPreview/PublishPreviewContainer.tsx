import { BlogPostReq } from '@app/services/blog/postApi';
// import getUploadImageUrl from '@utils/uploadImage';
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

        //여기서는 file만 넣어두고 포스트시에만 이미지 업로드하기
        setBlogPostInfo({ ...blogPostInfo, thumbnail: file });
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
