import { BlogPostReq } from '@app/services/blog/postApi';
// import getUploadImageUrl from '@utils/uploadImage';
import validFile from '@utils/valid/validFile';
import { ChangeEvent, useCallback, useState } from 'react';
import PublishPreviewPresenter from './PublishPreviewPresenter';
import { useAppDispatch } from '@app/hooks';
import { checkHavingFile } from '@pages/Write/WriteSlice';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishPreviewContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const [isToggled, setToggled] = useState(false);
  const [fileObj, setFileObj] = useState<File>(); //file
  // URL.revokeObjectURL()를 위해 추가한 코드
  const [fileUrl, setFileUrl] = useState(''); //url

  const dispatch = useAppDispatch();

  const onChangeThumbnail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //파일 유효성 확인
      validFile(file);

      if (file) {
        // URL.revokeObjectURL()를 위해 추가한 코드
        setFileObj(file);
        dispatch(checkHavingFile(true));
        setToggled(false);

        // 이미지를 넣을때마다 cloud에 올리는게 아닌 잠시 file을 보관해두기
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
    if (fileObj) setFileObj(undefined); //file
    if (!fileObj) setFileUrl(''); //url
    dispatch(checkHavingFile(false));
    setToggled((prev) => !prev);
  }, [dispatch, fileObj]);

  const onClickRestoreImg = useCallback(() => {
    if (typeof blogPostInfo.thumbnail === 'object') setFileObj(blogPostInfo.thumbnail); //file
    if (typeof blogPostInfo.thumbnail === 'string') setFileUrl(blogPostInfo.thumbnail); //url
    dispatch(checkHavingFile(true));
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
