import { prisma } from "../app/database.js";
import { ResponseError } from "../app/error.js";
import {checkDuplicate} from "../utils/exists.js";
import { ReqRegisterUmkm} from "../validation/user-validation.js";
import bcrypt from "bcrypt";

/**
 * @typedef {import("zod").z.infer<typeof ReqRegisterUmkm>} RequestRegisterUmkm
 * @param {RequestRegisterUmkm} request 
 */
async function registerUmkm(request) {

    await checkDuplicate(request.email, request.username);

    const hashedPassword = await bcrypt.hash(request.password, 10);
    
    const result = await prisma.user.create({
        data: {
            fullName: request.fullName,
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

async function registerSupplier(request){
    try{
        await checkDuplicate(request.email, request.username);
        const hashedPassword = await bcrypt.hash(request.password, 10);

        const hasil = await prisma.user.create({
            data: {
                fullName: request.fullName,
                username: request.username,
                email: request.email,
                password: request.password,
                role: "SUPPLIER",
                profileSupplier: {
                    create: {
                        supplierName: request.supplierName
                    }
                }
            }, 
            omit: {password: true}
        });
    }

    catch(err){
        nextTick(err);
    }
}






export default {
    registerUmkm, registerSupplier
};