import path from "node:path";
import { ResponseError } from "../app/error.js";
import { s3Client } from "../app/objectStorage.js";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


async function getPresignedUrl({fileName, fileType, fileSize}) {
    if(!fileName || !fileType) throw new ResponseError(400, "Invalid input");

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if(fileSize > MAX_FILE_SIZE) throw new ResponseError("file terlalu besar");

    const fileExt = path.parse(fileName).ext;
    const objectKey = `upload/${uuidv4()}${fileExt}`;

    const commad = new PutObjectCommand({
        Bucket: "umkm-bucket",
        Key: objectKey,
        ContentType: fileType 
    });

    const uploadUrl = await getSignedUrl(s3Client, commad, {
        expiresIn: 300
    });

    return {
        uploadUrl,
        fileUrl: `http://localhost:4566/umkm-bucket/${objectKey}`,
        key: objectKey
    };
}


export {
    getPresignedUrl
};


