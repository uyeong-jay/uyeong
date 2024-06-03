import crypto from 'crypto';

export const uploadImage = async (file: File) => {
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);

  const res = await fetch(process.env.CLOUDINARY_UPLOAD_API, {
    method: 'POST',
    body: formData,
  });

  const { public_id, secure_url } = await res.json();

  return { id: public_id, url: secure_url };
};

export const getPublicIdFromUrl = (url: string | undefined) => {
  const regex = /(?<=\/)[^\/]+\/[^\/]+(?=\.[^\/.]+$)/;
  const match = url?.match(regex);
  return match ? match[0] : null;
};

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest('hex');
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteImage = async (id: string) => {
  if (!id) return;
  const timestamp = new Date().getTime().toString();
  const signature = generateSHA1(generateSignature(id, process.env.CLOUDINARY_API_SECRET));

  const formData = new FormData();
  formData.append('public_id', id);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('api_key', process.env.CLOUDINARY_API_KEY);

  const res = await fetch(process.env.CLOUDINARY_DELETE_API, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data;
};
