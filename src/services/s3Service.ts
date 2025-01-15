import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (file: Buffer, fileName: string) => {
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is not defined");
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: "image/jpeg", // Update content type based on your use case
  };

  return s3
    .upload(params)
    .promise()
    .then((data) => data.Location) // Returns the uploaded file's URL
    .catch((error) => {
      console.error("Error uploading to S3:", error);
      throw error;
    });
};

export const getPresignedUploadUrl = async (
  fileName: string,
  contentType: string = "video/mp4"
) => {
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME is not defined");
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName, // e.g. "videos/myCoolVideo.mp4"
    ContentType: contentType,
    Expires: 60, // URL expiration in seconds (e.g., 1 min)
  };

  // Returns a promise that resolves to a pre-signed URL
  return s3.getSignedUrlPromise("putObject", params);
};
