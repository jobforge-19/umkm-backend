import {z} from "zod";

const registerUserPemasok = z.object({
    email: z
        .string()
        .email("Format Email Tidak Valid :(")
        .max(20, "Email Maksimal 20 Karakter"),
    kata_sandi: z
        .string()
        .min(8, "Password Minimal 8 Karakter"),

    username: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, "Username Tidak Boleh Mengandung Spasi")
        .min(5, "Username Minimal 5 Karakter")
        .max(20, "Username Maksimal 20 Karakter"),
    noWa: z
        .number()
        .min(12, "Nomor Whatsapp Minimal 12 Katakter")
        .max(20, "Nomor Whatsapp Maksimal 20 Karakter"),

    nama_usaha_or_kebun: z 
        .string()
        .min(3, "Nama Kebun Atau Usaha Minimal 3 Karakter")
        .max(20, "Username Maksimal 20 Katakter"),
    nama_lengkap: z
        .string()
        .min(3, "Nama Lengkap Minimal 3 Karakter")
        .max(20, "Nama Lengkap Maksimal 20 Karakter"),
    
    });

const registerUserUmkm = z.object({

    bio: z
        .string()
        .min(1, "Deskripsi UMKM Minimal Satu Karakter")
        .max(70, "Deskripsi UMKM Maksimal 70 Karakter"),

    alamat: z
        .string()
        .min(5, "Alamat UMKM Minimal Satu Karakter")
        .max(70, "Alamat UMKM Maksimal 70 Karakter"),

    username: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, "Username Tidak Boleh Mengandung Spasi")
        .min(5, "Username Minimal 5 Karakter")
        .max(20, "Username Maksimal 20 Karakter"),
    
    noWa: z
        .number()
        .min(12, "Nomor Whatsapp Minimal 12 Katakter")
        .max(20, "Nomor Whatsapp Maksimal 20 Karakter"),

    nama_umkm: z 
        .string()
        .min(3, "Nama UMKM Minimal 3 Karakter")
        .max(20, "Nama UMKM Maksimal 20 Katakter"),

    kata_sandi: z
        .string()
        .min(8, "Password Minimal 8 Karakter"),

    email: z
        .string()
        .email("Format Email Tidak Valid :(")
        .max(20, "Email Maksimal 20 Karakter"),
});

export {
    registerUserPemasok,
    registerUserUmkm
};


