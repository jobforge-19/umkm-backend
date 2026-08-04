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
            noWa: request.noWa,
            role: "UMKM",
            profileUmkm: {
                create: {
                    businessName: request.businessName
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
                password: hashedPassword,
                noWa: request.noWa,
                role: "SUPPLIER",
                profileSupplier: {
                    create: {
                        businessName: request.businessName
                    }
                }
            }, 
            omit: {password: true}
        });
        return hasil;
    }

    catch(err){
        throw new ResponseError(400, err.message);
    }
}


/**
 * @typedef {import('zod').z.infer<typeof ReqLogin>} request
 * @param {request} req
 */

async function add_product(req, accessToken){
    const findID = await prisma.profilesupplier.findFirst({
        where: {username: accessToken.username},
        select: {id: true}
    });

    const toDB = await prisma.products.create({
        data: {
            id_supplier: findID.id,
            product_name: req.product_name,
            category: req.category,
            product_photo: req.product_photo,
            unit: req.unit,
            description: req.description,
            unit_price: req.unit_price,
            moq: req.moq,
            stock: req.stock,
            productStatus: req.productStatus,
            avaliable: req.avaliable
        }
    });
    return toDB;
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
            role: true,
            password: true
        },
        where: {
            email: request.email
        }
    });

    if(!user) throw new ResponseError(401, "Akun Tidak Ditemukan");

    const isPwValid = await bcrypt.compare(request.password, user.password);
    
    if(!(isPwValid)) throw new ResponseError(400, "Password/Email Tidak Valid");

    const refreshToken = jwtUtil.createRefreshToken({
        fullName: user.fullName,
        username: user.username,
        role: user.role
    });

    const accessToken = jwtUtil.createAccesToken({
        username: user.username,
        role: user.role
    });

    return{ refreshToken, accessToken }; 
}





export default {
    registerUmkm, 
    registerSupplier,
    login,
    add_product
};