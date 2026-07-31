import {email, z} from "zod";

const ReqRegisterSupplier = z.object({
    fullName: z
        .string()
        .min(3, "Nama Lengkap Minimal 3 Karakter")
        .max(50, "Nama Lengkap Maksimal 50 Karakter"),
    email: z
        .email("Format Email Tidak Valid")
        .max(20, "Email Maksimal 20 Karakter"),
    password: z
        .string()
        .min(8, "Password Minimal 8 Karakter"),
    businessName: z 
        .string()
        .min(3, "Nama Supplier Minimal 3 Karakter")
        .max(20, "Nama Supplier Maksimal 20 Katakter"),
    username: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, "Username Tidak Boleh Mengandung Spasi")
        .min(3, "Nama Lengkap Minimal 3 Karakter")
        .max(20, "Nama Lengkap Maksimal 20 Karakter"),
    noWa: z
        .string()
        .startsWith("0")
        .min(10)
        .max(13)
    });

const ReqRegisterUmkm = z.object({
    fullName: z
        .string()
        .min(3, "Nama Lengkap Minimal 3 Karakter")
        .max(50, "Nama Lengkap Maksimal 50 Karakter"),
    username: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, "Username Tidak Boleh Mengandung Spasi")
        .min(5, "Username Minimal 5 Karakter")
        .max(20, "Username Maksimal 20 Karakter"),
    businessName: z 
        .string()
        .min(3, "Nama UMKM Minimal 3 Karakter")
        .max(20, "Nama UMKM Maksimal 20 Katakter"),
    password: z
        .string()
        .min(8, "Password Minimal 8 Karakter"),
    email: z
        .email("Format Email Tidak Valid")
        .max(20, "Email Maksimal 20 Karakter"),
    noWa: z
        .string()
        .startsWith("0")
        .min(10)
        .max(13)
});

const ReqLogin = z.object({
    email: z
        .email("Format Email Tidadk Valid")
        .max(20, "Email Maksimal 20 Karakter"),
    password: z
        .string()
        .min(8, "Password Minimal 8 Karakter")
});


const ReqUpdateUserProfile = z.object({
    email: z
        .email()
        .max(20, "Email Maksimal 20 Karakter"),
    fullName: z
        .string()
        .min(3, "Nama Lengkap Minimal 3 Karakter")
        .max(50, "Nama Lengkap Maksimal 50 Karakter"),
    noWa: z
        .string()
        .startsWith("0")
        .min(10)
        .max(13),
    businessName: z 
        .string()
        .min(3, "Nama UMKM Minimal 3 Karakter")
        .max(20, "Nama UMKM Maksimal 20 Katakter"),
    bio: z
        .string()
        .optional(),
    address: z
        .object({
            province: z
                .string()
                .optional(),
            regency: z
                .string()
                .optional(),
            street: z
                .string()
                .optional(),
            details: z
                .string()
                .optional()
        })
        .optional()

});

export {
    ReqRegisterSupplier,
    ReqRegisterUmkm,
    ReqLogin,
    ReqUpdateUserProfile
};


