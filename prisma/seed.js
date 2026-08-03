import {prisma} from '../src/app/database.js';
import {bcrypt} from 'bcrypt';
import 'dotenv/config';

async function makeAdmin(){
    const hashedPassword = await bcrypt.hash(process.env.PASS_ADMIN, 10);

    const admin = await prisma.user.upsert({
        where: {
            email: process.env.EMAIL_ADMIN
        },
        update: {
            password: hashedPassword,
            username: process.env.USERNAME_ADMIN,
            email: process.env.EMAIL_ADMIN
        },
        create: {
            username: process.env.USERNAME_ADMIN,
            email: process.env.EMAIL_ADMIN,
            password: hashedPassword,
            role: 'ADMIN'
        }
    });
}

makeAdmin().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect;
});