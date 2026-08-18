import {prisma} from "../app/database.js";
import { ResponseError } from "../app/error.js";

export const checkDuplicate = async (email, username, noWa) => {

    const yangDicari = [];

    if(username){yangDicari.push({username: username});}
    if(email){yangDicari.push({email: email});}
    if(noWa){yangDicari.push({noWa});}

    if(yangDicari.length === 0){ return; }

    const hasil = prisma.user.findFirst({
        where: {
            OR: yangDicari,
        }
    });

    if(hasil){
        if(username && hasil.username === username){ throw new ResponseError(400, "Username Telah Digunakan");}
        if(email && hasil.email === email){ throw new ResponseError(400, "Email Telah Digunakan");}
        if(noWa && hasil.noWa === noWa){ throw new ResponseError(400, "Nomor Whatsapp Telah Digunakan");}
    }
};

export default{
    checkDuplicate
};