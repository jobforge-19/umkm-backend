import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    endpoint: process.env.R2_ENDPOINT_URL || "http://localhost:4566",
    region: "us-east-1",
    credentials: { 
        accessKeyId: "test", 
        secretAccessKey: "test" 
    },
    forcePathStyle: true,
});

export async function configureBucketCors(bucketName) {
    const command = new PutBucketCorsCommand({
        Bucket: bucketName,
        CORSConfiguration: {
            CORSRules: [
                {
                    AllowedOrigins: ["*"], // Atau tentukan origin frontend Anda, misal: ["http://localhost:5173"]
                    AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                    AllowedHeaders: ["*"],
                    ExposeHeaders: ["ETag"],
                },
            ],
        },
    });

    await s3Client.send(command);
    console.log(`CORS berhasil dikonfigurasi untuk bucket: ${bucketName}`);
}

configureBucketCors("umkm-bucket"); 