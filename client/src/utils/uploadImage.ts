export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);

  //form(body)을 fetch한 후 응답(res) 받아오기
  const res = await fetch(process.env.CLOUDINARY_API, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
