export const getCloudinaryURL = (req, res) => {
  res.send(process.env.CLOUDINARY_URL);
};

export const getCloudinaryUploadPreset = (req, res) => {
  res.send(process.env.CLOUDINARY_UPLOAD_PRESET);
};
