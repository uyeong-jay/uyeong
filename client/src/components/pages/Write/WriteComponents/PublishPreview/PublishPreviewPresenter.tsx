import { BlogPostReq } from '@app/services/blog/postApi';
import CameraIcon from '@icons/CameraIcon';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import { DIV } from './PublishPreviewStyle';
import XMarkIcon from '@icons/XMarkIcon';
import RotateIcon from '@icons/RotateIcon';

interface Props {
  blogPostInfo: BlogPostReq;
  fileObj?: File;
  fileUrl: string;
  onChangeThumbnail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDeleteImg: () => void;
  onClickRestoreImg: () => void;
  isToggled: boolean;
}

const PublishPreviewPresenter = ({
  blogPostInfo,
  fileObj,
  fileUrl,
  onChangeThumbnail,
  onChangeTextarea,
  onClickDeleteImg,
  onClickRestoreImg,
  isToggled,
}: Props) => {
  const { description, thumbnail } = blogPostInfo;

  return (
    <DIV.PublishPreview>
      <div className="post-thumbnail-wrapper-with-image post-thumbnail-wrapper post-thumbnail">
        {fileUrl ? (
          <Image
            className="post-thumbnail non-clickable-image"
            src={fileUrl}
            onLoad={() => {
              URL.revokeObjectURL(fileUrl);
            }}
            alt="post thumbnail"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <></>
        )}
        <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeThumbnail} />

        <button>
          <CameraIcon />
          <span>Upload thumbnail</span>
        </button>
      </div>
      <DIV.PublishPreviewBtns>
        {fileUrl && (
          <button className="preview-upload-btn">
            <CameraIcon />
            <span>Upload</span>
            <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeThumbnail} />
          </button>
        )}

        <div className={`preview-active-btns ${!fileUrl && 'extend'}`}>
          {!isToggled ? (
            <button onClick={onClickDeleteImg} disabled={fileObj || thumbnail ? false : true}>
              <XMarkIcon />
            </button>
          ) : (
            <button onClick={onClickRestoreImg}>
              <RotateIcon />
            </button>
          )}
        </div>
      </DIV.PublishPreviewBtns>

      <textarea
        value={description}
        onChange={onChangeTextarea}
        maxLength={200}
        rows={6}
        placeholder="Provide a brief summary of the blog post..."
        spellCheck={false}
      />
      <span>{description.length}/200</span>
    </DIV.PublishPreview>
  );
};

export default PublishPreviewPresenter;
