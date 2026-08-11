import { prisma } from "../app/database.js";
import { ResponseError } from "../app/error.js";
import { ReqUpdateUserProfile } from "../validation/user-validation.js";


/**
 * 
 * @param {import("zod").z.infer<typeof ReqUpdateUserProfile>} request 
 * @returns 
 */
async function updateProfileUmkm(request) {
    const isExists = await prisma.user.findUnique({
        select: {
            username: true,
            fullName: true
        },
        where: {
            username: request.username
        }
    });

    if(!isExists) throw new ResponseError(400, "User not found");

    const user = await prisma.user.update({
        data: {
            email: request.email,
            fullName: request.fullName, 
            noWa: request.noWa,
            role: "UMKM",
            profileUmkm: {
                create: {
                    businessName: request.businessName,
                    address: request.address,
                }
            }
        },
        where: {
            username: username
        },
        omit: {
            password
        }
    });

    return user;
}

/**
 * 
 * @param {import("zod").z.infer<typeof ReqUpdateUserProfile>} request 
 */
async function updateProfileSupplier(request) {
    const isExists = await prisma.user.findUnique({
        select: {
            username: true,
            fullName: true
        },
        where: {
            username: request.username
        }
    });

     if(!isExists) throw new ResponseError(400, "User not found");

     const user = await prisma.user.update({
        data: {
            email: request.email,
            fullName: request.fullName, 
            noWa: request.noWa,
            role: "SUPPLIER",
            profileUmkm: {
                create: {
                    businessName: request.businessName,
                    address: request.address,
                }
            }
        },
        where: {
            username: username
        },
        omit: {
            password
        }
    });

    return user;

}


async function getUserProfile(username, role){
    if(role === "UMKM"){
        const user = prisma.user.findFirst({
            where:{
                username: username
            },
            select:{
                fullName: true,
                verified: true,
                username: true,
                noWa: true,
                profileUmkm: {
                    select: {
                        businessName: true,
                        address:{
                            select: {
                                province: true,
                                regency: true,
                                street: true,
                                details: true
                            }
                        },
                        bio: true,
                        following: true,
                        fotoProfile: true,
                        bgProfile: true
                    }
                }
            }
        });
    }
    else if(role === 'SUPPLIER'){
        const user = prisma.user.findFirst({
            where:{
                username: username
            },
            select:{
                fullName: true,
                verified: true,
                username: true,
                noWa: true,
                profileSupplier: {
                    select: {
                        businessName: true,
                        address:{
                            select: {
                                province: true,
                                regency: true,
                                street: true,
                                details: true
                            }
                        },
                        bio: true,
                        followers: true,
                        fotoProfile: true,
                        bgProfile: true
                    }
                }
            }
        });
    }
    else{
        return{pesan: "Amboi"};

     }

    return user;
}


export default {
    updateProfileUmkm,
    updateProfileSupplier,
    getUserProfile
};