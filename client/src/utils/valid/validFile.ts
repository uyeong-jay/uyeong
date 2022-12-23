const validFile = (file: File | undefined) => {
  //파일 에러
  if (file) {
    //파일 크기 에러
    if (file.size > 1024 * 1024) {
      alert('Image size must be less than 1MB.');
      return;
    }

    //파일 확장자 에러
    if (
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      alert('Please choose other image extension');
      return;
    }
  }
};

export default validFile;
