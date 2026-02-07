import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [process.env.APP_URL!],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
      phone: {
        type: "string",
        defaultValue: "01734566734",
      },
      status: {
        type: "string",
        defaultValue: "UNBAN",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    // autoSignIn: false,
    // requireEmailVerification: false,
  },

  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   sendVerificationEmail: async ({ user, url, token }, request) => {
  //     try {
  //       const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

  //       const info = await transporter.sendMail({
  //         from: '"Medi-sotre" <suvodatta72@gmail.com>',
  //         to: `${user.email}`,
  //         subject: `Welcome ${user.name}, please verify your email!`,
  //         text: "Hello world?",
  //         html: `
  //               <div style="max-width:600px; margin:0 auto; font-family: Arial, sans-serif; line-height:1.6; color:#333;">
  //                 <h2 style="color:#2c3e50;">Welcome to Medi-Store!</h2>
  //                 <p>Hi ${user.name},</p>
  //                 <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
  //                 <p style="text-align:center;">
  //                   <a href="${verificationUrl}"
  //                     style="background-color:#4CAF50; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">
  //                     Verify Email
  //                   </a>
  //                 </p>
  //                 <p>If the button doesn’t work, copy and paste the following link into your browser:</p>
  //                 <p><a href="${verificationUrl}">${verificationUrl}</a></p>
  //                 <p>Thanks,<br/>The Medi-Store Team</p>
  //               </div>
  //             `, // HTML version of the message
  //       });

  //       // console.log("Message sent:", info.messageId);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // },

  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
