import { prisma } from "../app/database.js";
import { registerUserUmkm } from "../validation/user-validation.js";
import bcrypt from "bcrypt";

/**
 * @typedef {import("zod").z.infer<typeof registerUserUmkm>} RequestRegisterUmkm
 * @param {RequestRegisterUmkm} request 
 */
export async function registerUmkm(request) {
    const hashedPassword = await bcrypt.hash(request.password);
    
    const result = prisma.user.create({
        data: {
            username: request.username,
            email: request.email,
            password: hashedPassword,
            role: "UMKM",
        },
        omit: {
            password: true
        }
    });

    return result;
}