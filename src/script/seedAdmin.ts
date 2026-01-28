import { UserRole } from "../constants/user-role";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASS,
      role: UserRole.ADMIN,
    };

    console.log(adminData);

    const existsAdmin = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existsAdmin) {
      throw new Error("your account is already exists");
    }

    const singUpAdmin = await fetch(
      `http://localhost:5000/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      },
    );

    console.log(singUpAdmin);

    if (singUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
