import { imageApi } from 'services/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const MAPPING_FILE_TYPES = {
  JPG: ['image/jpg', 'image/jpeg'],
  PNG: ['image/png'],
  GIF: ['image/gif'],
  ICO: ['image/x-icon'],
};

export const acceptTypes = (allowTypes) => {
  const ret = [];
  allowTypes.forEach((type) => ret.push(...MAPPING_FILE_TYPES[type]));
  return ret;
};

export const useUploadImage = (maxSize = 2, allows = ['JPG', 'PNG', 'GIF']) => {
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async (file) => {
    try {
      setLoading(true);
      const res = await imageApi.uploadImage(file);
      return res?.image_url;
    } finally {
      setLoading(false);
    }
  };

  const validateImgType = (file) => {
    if (!acceptTypes(allows).includes(file.type)) {
      toast.error(`Vui lòng tải lên file có định dạng ${allows.join(', ')}!`);
      return false;
    }
    return true;
  };

  const validateImgSize = (file) => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Vui lòng tải lên file không lớn hơn ${maxSize}MB!`);
      return false;
    }
    return true;
  };

  const validateImgContent = (file) => {
    const type = validateImgType(file);
    if (!type) {
      return false;
    }
    const size = validateImgSize(file);
    return size;
  };

  return {
    handleUploadImage,
    loading,
    maxSize,
    allows,
    validateImgContent,
  };
};
