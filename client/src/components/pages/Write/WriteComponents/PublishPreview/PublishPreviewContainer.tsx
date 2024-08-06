import { BlogPostReq } from '@app/services/blog/postApi';
import validFile from '@utils/valid/validFile';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PublishPreviewPresenter from './PublishPreviewPresenter';
import { useAppDispatch } from '@app/hooks';
import { setFileModified, setFileRemoved, setFileUnchanged } from '@pages/Write/WriteSlice';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishPreviewContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const [isToggled, setToggled] = useState(false);
  const [fileObj, setFileObj] = useState<File>(); //obj: 클라우드에 없는 새로운 이미지
  const [fileUrl, setFileUrl] = useState(''); //url: 클라우드에 이미 존재하는 이미지

  const dispatch = useAppDispatch();

  useEffect(() => {
    const postThumbnail = blogPostInfo.thumbnail;

    if (fileObj) {
      //업로드 후
      setFileUrl(URL.createObjectURL(fileObj));
    } else if (!fileObj && postThumbnail && typeof postThumbnail === 'string') {
      // 초기(update)
      setFileUrl(postThumbnail as string);
    } else {
      // 초기(post) or 제거 후
      setFileUrl('');
    }
  }, [blogPostInfo.thumbnail, fileObj]);

  const onChangeThumbnail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //파일 유효성 확인
      validFile(file);

      if (file) {
        setFileObj(file);
        dispatch(setFileModified());
        setToggled(false);

        // 이미지를 넣을때마다 클라우드에 올리는게 아닌 잠시 보관
        setBlogPostInfo({ ...blogPostInfo, thumbnail: file });
      }
    },
    [blogPostInfo, dispatch, setBlogPostInfo],
  );

  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      const newValue = inputValue.replace(/\n/g, ''); //줄바꿈 제거

      if (newValue.length <= 200) {
        setBlogPostInfo({ ...blogPostInfo, description: newValue });
      } else {
        return;
      }
    },
    [blogPostInfo, setBlogPostInfo],
  );

  const onClickDeleteImg = useCallback(() => {
    if (fileObj) setFileObj(undefined);
    if (!fileObj) setFileUrl('');
    dispatch(setFileRemoved());
    setToggled((prev) => !prev);
  }, [dispatch, fileObj]);

  const onClickRestoreImg = useCallback(() => {
    if (typeof blogPostInfo.thumbnail === 'object') {
      setFileObj(blogPostInfo.thumbnail);
      dispatch(setFileModified()); //새로운 이미지(obj)일 경우만 클라우드에 업로드
    }
    if (typeof blogPostInfo.thumbnail === 'string') {
      setFileUrl(blogPostInfo.thumbnail);
      dispatch(setFileUnchanged());
    }
    setToggled((prev) => !prev);
  }, [blogPostInfo.thumbnail, dispatch]);

  return (
    <PublishPreviewPresenter
      blogPostInfo={blogPostInfo}
      fileObj={fileObj}
      fileUrl={fileUrl}
      onChangeThumbnail={onChangeThumbnail}
      onChangeTextarea={onChangeTextarea}
      onClickDeleteImg={onClickDeleteImg}
      onClickRestoreImg={onClickRestoreImg}
      isToggled={isToggled}
    />
  );
};

export default PublishPreviewContainer;
