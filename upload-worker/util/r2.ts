import { S3 } from 'aws-sdk';
import fs from 'fs';

const s3 = new S3(
    {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_ACCESS_KEY_SECRET,
        endpoint: process.env.R2_URL,
    }
);

export const uploadFile = async (fileName: string, filePath: string) => {
    const fileContent = fs.readFileSync(filePath);

    const params : any  = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: fileContent
    };
    return s3.upload(params).promise();
}