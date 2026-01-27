import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

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
    // requireEmailVerification: true,
  },
});
