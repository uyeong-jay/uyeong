const validFile = (file?: File) => {
  //파일 에러
  if (file) {
    //파일 크기 에러
    if (file.size > 1024 * 1024 * 5) {
      return 'The image size should be less than 5MB.';
    }

    //파일 확장자 에러
    if (
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      return 'Please select a different image file extension.';
    }
  }

  return '';
};

export default validFile;
