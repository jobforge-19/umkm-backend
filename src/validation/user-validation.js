import * as z from "zod";


const userLogin = z.object({
    username: z.string().length(10),
    password: z.string()
});


userLogin.parse(reqestFromFrontend);