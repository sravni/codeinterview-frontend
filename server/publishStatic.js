/* eslint-disable @typescript-eslint/no-var-requires */
const { CDN } = require('@sravni/server-utils/lib/cdn');
const path = require('path');
const ASSETS_PATH = path.join(process.cwd(), '../client/build/static');

const cdn = new CDN({
  s3Endpoint: process.env.S3_ENDPOINT,
  s3Bucket: process.env.S3_BUCKET,
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID,
  s3PublicPath: process.env.S3_PUBLIC_PATH,
});

cdn.uploadFolder(ASSETS_PATH, process.env.SERVICE_NAME, {
  uploadPathDecorator: (filePath) => {
    let newFilePath = filePath;

    if (newFilePath.indexOf(ASSETS_PATH) !== -1) {
      newFilePath = newFilePath.replace(ASSETS_PATH, '/static');
    }

    return newFilePath;
  },
});
