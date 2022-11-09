export const getUploadImageUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);

  const res = await fetch(process.env.CLOUDINARY_API, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  // return data;
  // data {
  //   access_mode: 'public';
  //   asset_id: '~';
  //   bytes: 2291;
  //   created_at: '~';
  //   etag: '~';
  //   folder: 'uyeong-blog';
  //   format: 'jpg';
  //   original_filename: 'greenJPG';
  //   placeholder: false;
  //   public_id: 'uyeong-blog/id~';
  //   resource_type: 'image';
  //   signature: '~';
  //   secure_url: '사진 url';
  //   url: '사진 url';
  //   tags: [];
  //   type: 'upload';
  //   version: number~;
  //   version_id: '~';
  //   height: 739;
  //   width: 851;
  // }

  const url = data.secure_url;

  return url;
};

// 사용
// const image = await uploadImage(file);
// console.log(image);
