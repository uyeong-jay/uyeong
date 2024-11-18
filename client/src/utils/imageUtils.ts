import { CloudinaryTypes } from '@src/pages/settings';
import sha256 from 'crypto-js/sha256';

export const uploadImage = async (file: File, cloudinaryConfig: CloudinaryTypes) => {
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('cloud_name', cloudinaryConfig.cloudName);

  const res = await fetch(cloudinaryConfig.uploadApi, {
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

const generateSHA256 = (data: any) => {
  const hashDigest = sha256(data);
  return hashDigest.toString();
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteImage = async (id: string, cloudinaryConfig: CloudinaryTypes) => {
  if (!id) return;
  const timestamp = new Date().getTime().toString();
  const signature = generateSHA256(generateSignature(id, cloudinaryConfig.apiSecret));

  const formData = new FormData();
  formData.append('public_id', id);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('api_key', cloudinaryConfig.apiKey);

  const res = await fetch(cloudinaryConfig.deleteApi, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data;
};
