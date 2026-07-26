import { prisma } from "../app/database.js";
import { ReqRegisterUmkm} from "../validation/user-validation.js";
import bcrypt from "bcrypt";

/**
 * @typedef {import("zod").z.infer<typeof ReqRegisterUmkm>} RequestRegisterUmkm
 * @param {RequestRegisterUmkm} request 
 */
async function registerUmkm(request) {
    const hashedPassword = await bcrypt.hash(request.password, 10);
    
    const result = await prisma.user.create({
        data: {
            username: request.username,
            email: request.email,
            password: hashedPassword,
            role: "UMKM",
            profileUmkm: {
                create: {
                    umkmName: request.umkmName
                }
            }
        },
        omit: {
            password: true
        }
    });

    return result;
}






export default {
    registerUmkm
};