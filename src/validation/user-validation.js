import {z} from "zod";

const registerUserSupplier = z.object({
    email: z
        .string()
        .email("Format Email Tidak Valid")
        .max(20, "Email Maksimal 20 Karakter"),
    password: z
        .string()
        .min(8, "Password Minimal 8 Karakter"),
    supplierName: z 
        .string()
        .min(3, "Nama Kebun Atau Usaha Minimal 3 Karakter")
        .max(20, "Nama Kebun Atau Usaha Maksimal 20 Katakter"),
    username: z
        .string()
        .min(3, "Nama Lengkap Minimal 3 Karakter")
        .max(20, "Nama Lengkap Maksimal 20 Karakter"),
    
    });

const registerUserUmkm = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, "Username Tidak Boleh Mengandung Spasi")
        .min(5, "Username Minimal 5 Karakter")
        .max(20, "Username Maksimal 20 Karakter"),
    umkmName: z 
        .string()
        .min(3, "Nama UMKM Minimal 3 Karakter")
        .max(20, "Nama UMKM Maksimal 20 Katakter"),
    password: z
        .string()
        .min(8, "Password Minimal 8 Karakter"),
    email: z
        .string()
        .email("Format Email Tidak Valid")
        .max(20, "Email Maksimal 20 Karakter"),
});

export {
    registerUserSupplier,
    registerUserUmkm
};


