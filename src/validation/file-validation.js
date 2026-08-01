import * as z from "zod";

const RequestPresignedUrl = z.object({
    fileName: z.string().trim(),
    fileType: z.enum(["image/avif", "image/webp", "video/mp4"]),
    fileSize: z.number(),
    location: z.string().endsWith("/").refine((val) => val[0] != "/", {
        error: "location cant start with /"
    })
});


export {
    RequestPresignedUrl
};