import { prisma } from "../app/database.js";
import { ResponseError } from "../app/error.js";
import {checkDuplicate} from "../utils/exists.js";
import { ReqRegisterUmkm, ReqLogin} from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import jwtUtil from "../utils/jwt.js";

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


/**
 * 
 * @param {import("zod").z.infer<typeof ReqLogin>} request 
 */
async function login(request) {
    const user = await prisma.user.findUnique({
        select: {
            fullName: true,
            username: true,
            email: true,
            password: true,
            role: true
        },
        where: {
            email: request.email
        }
    });

    if(!user) throw new ResponseError(401, "Harap Login Telebih daulu");

    const isPwValid = await bcrypt.compare(request.password, user.password);
    
    const isEmailValid = user.email == request.email;

    if(!(isEmailValid && isPwValid)) throw new ResponseError(400, "Password/Email Tidak Valid");

    const refreshToken = jwtUtil.createRefreshToken({
        fullName: user.fullName,
        username: user.username,
        role: user.role
    });

    return refreshToken;
}





export default {
    registerUmkm, 
    registerSupplier,
    login
};