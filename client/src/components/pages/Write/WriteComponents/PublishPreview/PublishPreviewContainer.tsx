import { BlogPostReq } from '@app/services/blog/postApi';
// import getUploadImageUrl from '@utils/uploadImage';
import validFile from '@utils/valid/validFile';
import { ChangeEvent, useCallback, useState } from 'react';
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

  const onChangeThumbnail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //파일 유효성 확인
      validFile(file);

      if (file) {
        setFileObj(file);
        dispatch(setFileModified());
        setToggled(false);

        // 이미지를 넣을때마다 클라우드에 올리는게 아닌 잠시 보관만 해두기
        setBlogPostInfo({ ...blogPostInfo, thumbnail: file });
      }
    },
    [blogPostInfo, dispatch, setBlogPostInfo],
  );

  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      //띄어쓰기 막기
      const inputValue = e.target.value;
      const newValue = inputValue.replace(/\n/g, '');

      if (newValue.length > 200) return;

      setBlogPostInfo({ ...blogPostInfo, description: newValue });
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
      onChangeThumbnail={onChangeThumbnail}
      onChangeTextarea={onChangeTextarea}
      onClickDeleteImg={onClickDeleteImg}
      onClickRestoreImg={onClickRestoreImg}
      fileUrl={fileUrl}
      setFileUrl={setFileUrl}
      isToggled={isToggled}
    />
  );
};

export default PublishPreviewContainer;
