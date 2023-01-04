import { BlogPostReq } from '@app/services/blog/postApi';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { StyledPublishPreview } from './PublishPreviewStyle';

interface Props {
  blogPostInfo: BlogPostReq;
  fileObj: File | undefined;
  onChangeThumbnail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const PublishPreviewPresenter = ({ blogPostInfo, fileObj, onChangeThumbnail, onChangeTextarea }: Props) => {
  const { description } = blogPostInfo;

  // URL.revokeObjectURL() 정상 실행을 위해 추가한 코드
  const [fileUrl, setFileUrl] = useState('/');
  useEffect(() => {
    if (fileObj) {
      setFileUrl(URL.createObjectURL(fileObj));
    }
  }, [fileObj]);

  return (
    <StyledPublishPreview>
      <div className="post-thumbnail-wrapper-with-image post-thumbnail-wrapper post-thumbnail ">
        {fileObj && (
          <Image
            className="post-thumbnail"
            src={fileUrl}
            onLoad={() => {
              URL.revokeObjectURL(fileUrl);
            }}
            alt="post thumbnail"
            width={300}
            height={200}
          />
        )}
        <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeThumbnail} />
        <i className="fa-solid fa-camera fa-2xl"></i>
        <button>Upload thumbnail</button>
      </div>
      <textarea value={description} onChange={onChangeTextarea} placeholder="간단히 소개하기" />
      <small>{description.length}/150</small>
    </StyledPublishPreview>
  );
};

export default PublishPreviewPresenter;
