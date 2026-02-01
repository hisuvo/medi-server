var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express2 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          String?    @default("USER")\n  phone         String?    @default("01734566734")\n  status        String?    @default("ACTIVE")\n  sessions      Session[]\n  accounts      Account[]\n  medicine      Medicine[]\n  reviews       Review[]\n  order         Order[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Category {\n  id          String     @id @default(uuid())\n  name        String     @unique\n  description String?\n  medicines   Medicine[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String   @id @default(uuid())\n  name         String\n  description  String?\n  price        Float\n  quantity     Int      @default(0)\n  image        String?\n  stock        Int?\n  manufacturer String?\n  isActive     Boolean? @default(true)\n\n  category   Category @relation(fields: [categoryId], references: [id])\n  categoryId String\n\n  seller   User   @relation(fields: [sellerId], references: [id])\n  sellerId String\n\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([categoryId])\n  @@index([sellerId])\n  @@map("medicines")\n}\n\n// ORDER\n\nmodel Order {\n  id            String              @id @default(uuid())\n  user          User                @relation(fields: [userId], references: [id])\n  userId        String\n  total         Float\n  paymentMethod PaymentMethodStatus @default(COD)\n  status        OrderStatus         @default(PENDING)\n  createdAt     DateTime            @default(now())\n  updatedAt     DateTime            @updatedAt\n\n  items           OrderItem[]\n  ShippingAddress ShippingAddress?\n\n  @@index([userId])\n  @@map("orders")\n}\n\nenum OrderStatus {\n  PENDING\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentMethodStatus {\n  COD\n}\n\nmodel OrderItem {\n  id         String   @id @default(uuid())\n  order      Order    @relation(fields: [orderId], references: [id])\n  orderId    String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n  medicineId String\n  quantity   Int\n  price      Float\n\n  @@index([orderId])\n  @@index([medicineId])\n  @@map("orterItems")\n}\n\nmodel ShippingAddress {\n  id       String @id @default(uuid())\n  orderId  String @unique\n  name     String\n  phone    String\n  address  String\n  city     String\n  postCode String\n\n  order Order @relation(fields: [orderId], references: [id])\n}\n\n// REVIEW\nmodel Review {\n  id         String   @id @default(uuid())\n  rating     Int // 1 to 5\n  comment    String?\n  user       User     @relation(fields: [userId], references: [id])\n  userId     String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n  medicineId String\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([userId])\n  @@index([medicineId])\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"total","kind":"scalar","type":"Float"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethodStatus"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"ShippingAddress","kind":"object","type":"ShippingAddress","relationName":"OrderToShippingAddress"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"}],"dbName":"orterItems"},"ShippingAddress":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"postCode","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToShippingAddress"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  ShippingAddressScalarFieldEnum: () => ShippingAddressScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Category: "Category",
  Medicine: "Medicine",
  Order: "Order",
  OrderItem: "OrderItem",
  ShippingAddress: "ShippingAddress",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MedicineScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  quantity: "quantity",
  image: "image",
  stock: "stock",
  manufacturer: "manufacturer",
  isActive: "isActive",
  categoryId: "categoryId",
  sellerId: "sellerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  total: "total",
  paymentMethod: "paymentMethod",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  medicineId: "medicineId",
  quantity: "quantity",
  price: "price"
};
var ShippingAddressScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  name: "name",
  phone: "phone",
  address: "address",
  city: "city",
  postCode: "postCode"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  userId: "userId",
  medicineId: "medicineId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        defaultValue: "01734566734"
      },
      status: {
        type: "string",
        defaultValue: "UNBAN",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Medi-sotre" <suvodatta72@gmail.com>',
          to: `${user.email}`,
          subject: `Welcome ${user.name}, please verify your email!`,
          text: "Hello world?",
          html: `
                <div style="max-width:600px; margin:0 auto; font-family: Arial, sans-serif; line-height:1.6; color:#333;">
                  <h2 style="color:#2c3e50;">Welcome to Medi-Store!</h2>
                  <p>Hi ${user.name},</p>
                  <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
                  <p style="text-align:center;">
                    <a href="${verificationUrl}" 
                      style="background-color:#4CAF50; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">
                      Verify Email
                    </a>
                  </p>
                  <p>If the button doesn\u2019t work, copy and paste the following link into your browser:</p>
                  <p><a href="${verificationUrl}">${verificationUrl}</a></p>
                  <p>Thanks,<br/>The Medi-Store Team</p>
                </div>
              `
          // HTML version of the message
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/middleware/globalErrorHandler.ts
var errorHandler = async (error, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "Internal server error!";
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    details: error
  });
};
var globalErrorHandler_default = errorHandler;

// src/modules/category/category.routes.ts
import express from "express";

// src/modules/category/category.service.ts
var getCategory = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          medicines: true
        }
      }
    }
  });
};
var getCategoryById = async ({ categoryId }) => {
  return await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId
    },
    include: {
      medicines: {
        select: {
          id: true,
          name: true,
          price: true,
          isActive: true,
          stock: true,
          seller: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    }
  });
};
var updateCategory = async (categoryId, payload) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId
    },
    select: {
      id: true
    }
  });
  const result = await prisma.category.update({
    where: {
      id: category.id
    },
    data: payload
  });
  return result;
};
var createCategory = async (payload) => {
  const result = await prisma.category.create({
    data: payload
  });
  return result;
};
var deleteCategory = async (categoryId) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId
    },
    select: {
      id: true
    }
  });
  const result = await prisma.category.delete({
    where: {
      id: category.id
    }
  });
  return result;
};
var categoryService = {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var getCategory2 = async (req, res) => {
  try {
    const result = await categoryService.getCategory();
    res.status(200).json({
      success: true,
      message: "Categories retrived successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      error: "Categories retrived failed",
      details: error
    });
  }
};
var getCategoryById2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
      throw new Error("You are unauthrozied");
    }
    const result = await categoryService.getCategoryById({ categoryId });
    res.status(200).json({
      success: true,
      message: "Categories created successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      error: "Categories created failed",
      details: error
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
      throw new Error("You are unauthrozied");
    }
    const result = await categoryService.updateCategory(categoryId, req.body);
    res.status(200).json({
      success: true,
      message: "Categories updated successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      error: "Comment updated failed",
      details: error
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
      throw new Error("You are unauthrozied");
    }
    const result = await categoryService.deleteCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Categories deleted successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      error: "Categories deleted failed",
      details: error
    });
  }
};
var createCategory2 = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Category created faild",
      details: error
    });
  }
};
var categoryController = {
  createCategory: createCategory2,
  getCategory: getCategory2,
  getCategoryById: getCategoryById2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      req.user = {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
        role: session?.user.role
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/modules/category/category.routes.ts
var router = express.Router();
router.get("/", categoryController.getCategory);
router.get("/:categoryId", categoryController.getCategoryById);
router.patch(
  "/:categoryId",
  auth_default("ADMIN" /* ADMIN */),
  categoryController.updateCategory
);
router.delete(
  "/:categoryId",
  auth_default("ADMIN" /* ADMIN */),
  categoryController.deleteCategory
);
router.post("/", auth_default("ADMIN" /* ADMIN */), categoryController.createCategory);

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/medicine/medicine.route.ts
import { Router as Router2 } from "express";

// src/modules/medicine/medicine.service.ts
var getMedicines = async (payload) => {
  const { search, isActive, limit, skip, sortBy, sortOrder } = payload;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: payload.search,
            mode: prismaNamespace_exports.QueryMode.insensitive
          }
        },
        {
          manufacturer: {
            contains: payload.search,
            mode: prismaNamespace_exports.QueryMode.insensitive
          }
        },
        {
          description: {
            contains: payload.search,
            mode: prismaNamespace_exports.QueryMode.insensitive
          }
        }
      ]
    });
  }
  if (typeof isActive === "boolean") {
    andConditions.push({ isActive });
  }
  return await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortBy]: sortOrder
    }
    // include: {
    //   reviews: true,
    // },
  });
};
var getMedicineById = async (medicineId) => {
  return prisma.$transaction(async (tx) => {
    const medicineData = await tx.medicine.findUnique({
      where: {
        id: medicineId
      }
    });
    return medicineData;
  });
};
var createMedicine = async (payload) => {
  return await prisma.medicine.create({
    data: payload
  });
};
var updateMedicine = async (payload, medicineId, userId, isSeller) => {
  if (!isSeller) {
    throw new Error("Only sellers can update medicines");
  }
  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId: userId
    }
  });
  if (!medicine) {
    throw new Error("You are not the owner of this medicine");
  }
  const result = await prisma.medicine.update({
    where: {
      id: medicineId
    },
    data: payload
  });
  return result;
};
var deleteMedicine = async (medicineId, userId, isSeller) => {
  if (!isSeller) {
    throw new Error("Only sellers can update medicines");
  }
  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId: userId
    }
  });
  if (!medicine) {
    throw new Error("You are not the owner of this medicine");
  }
  const result = await prisma.medicine.delete({
    where: {
      id: medicineId
    }
  });
  return result;
};
var medicineService = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
};

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/medicine/medicine.controller.ts
var getMedicines2 = async (req, res) => {
  try {
    const searchQueryString = (value) => typeof value === "string" ? value : "";
    const isActive = req.query.isActive ? req.query.isActive === "true" ? true : req.query.isActive === "false" ? false : void 0 : void 0;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(
      req.query
    );
    const result = await medicineService.getMedicines({
      search: searchQueryString(req.query.search),
      isActive,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json({
      success: true,
      message: "Medicine retrived successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Medicine retrived failed",
      details: error
    });
  }
};
var getMedicineById2 = async (req, res) => {
  try {
    const { medicineId } = req.params;
    if (!medicineId) {
      throw new Error("Medicine Id is required!");
    }
    const result = await medicineService.getMedicineById(medicineId);
    res.status(200).json({
      success: true,
      message: "Medicine retrived successfully",
      result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: "medicine retrived failed",
      details: e
    });
  }
};
var createMedicine2 = async (req, res) => {
  try {
    const user = req.user;
    req.body.sellerId = user?.id;
    const result = await medicineService.createMedicine(req.body);
    res.status(200).json({
      success: true,
      message: "Medicine created successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Medicine creation failed",
      details: error
    });
  }
};
var updateMedicine2 = async (req, res) => {
  try {
    const { medicineId } = req.params;
    if (!medicineId) {
      throw new Error("Medicine Id is required!");
    }
    const isSeller = req.user?.role === "SELLER" /* SELLER */;
    const userId = req.user?.id;
    const result = await medicineService.updateMedicine(
      req.body,
      medicineId,
      userId,
      isSeller
    );
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "medicine update failed",
      details: error.message
    });
  }
};
var deleteMedicine2 = async (req, res) => {
  try {
    const { medicineId } = req.params;
    if (!medicineId) {
      throw new Error("Medicine Id is required!");
    }
    const isSeller = req.user?.role === "SELLER" /* SELLER */;
    const userId = req.user?.id;
    const result = await medicineService.deleteMedicine(
      medicineId,
      userId,
      isSeller
    );
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "medicine delete failed",
      details: error.message
    });
  }
};
var medicineController = {
  getMedicines: getMedicines2,
  getMedicineById: getMedicineById2,
  createMedicine: createMedicine2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2
};

// src/modules/medicine/medicine.route.ts
var router2 = Router2();
router2.get("/", medicineController.getMedicines);
router2.get("/:medicineId", medicineController.getMedicineById);
router2.post("/", auth_default("SELLER" /* SELLER */), medicineController.createMedicine);
router2.put(
  "/:medicineId",
  auth_default("SELLER" /* SELLER */),
  medicineController.updateMedicine
);
router2.delete(
  "/:medicineId",
  auth_default("SELLER" /* SELLER */),
  medicineController.deleteMedicine
);

// src/modules/user/user.route.ts
import { Router as Router3 } from "express";

// src/modules/user/user.service.ts
var getUsers = async (user) => {
  if (user.role === "ADMIN" /* ADMIN */) {
    const allUser = await prisma.user.findMany();
    return allUser;
  }
  const ownUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });
  return ownUser;
};
var updateProfile = async (payload, user) => {
  let profileData = payload;
  if (user.role === "ADMIN" /* ADMIN */) {
    const { status, role, ...withoutStatusRole } = payload;
    profileData = withoutStatusRole;
  }
  const result = await prisma.user.update({
    where: {
      id: user.id,
      email: user.email
    },
    data: profileData
  });
  return result;
};
var updateUserStatus = async (payload, userId, adminUserId, isAdmin) => {
  if (!isAdmin) {
    throw new Error("Only Admin can update user status");
  }
  if (userId === adminUserId) {
    throw new Error("Admin cannot change own status");
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status: payload.status
    }
  });
  return result;
};
var userService = {
  getUsers,
  updateUserStatus,
  updateProfile
};

// src/modules/user/user.controller.ts
var getUsers2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const result = await userService.getUsers(user);
    res.status(202).json({
      success: true,
      message: "Users retrived successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "users retrived failed",
      details: error
    });
  }
};
var updateProfile2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const result = await userService.updateProfile(req.body, user);
    res.status(202).json({
      success: true,
      message: "Profile updated successfully",
      result
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: false,
      message: "Profile updated failed",
      details
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const isAdmin = req.user?.role === "ADMIN" /* ADMIN */;
    const adminUserId = req.user?.id;
    const result = await userService.updateUserStatus(
      req.body,
      userId,
      adminUserId,
      isAdmin
    );
    res.status(202).json({
      success: true,
      message: "Users status updated successfully",
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Users status updated failed",
      error: error.message,
      details: error
    });
  }
};
var userController = {
  getUsers: getUsers2,
  updateUserStatus: updateUserStatus2,
  updateProfile: updateProfile2
};

// src/modules/user/user.route.ts
var router3 = Router3();
router3.get(
  "/",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */),
  userController.getUsers
);
router3.patch(
  "/profile",
  auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */),
  userController.updateProfile
);
router3.patch("/:userId", auth_default("ADMIN" /* ADMIN */), userController.updateUserStatus);

// src/modules/order/order.route.ts
import { Router as Router4 } from "express";

// src/modules/order/order.service.ts
var getOrders = async (user) => {
  if (user.role === "CUSTOMER" /* CUSTOMER */) {
    const ownOrder = await prisma.order.findMany({
      where: {
        userId: user.id
      },
      include: {
        items: true
      }
    });
    return ownOrder;
  }
  if (user.role === "ADMIN" /* ADMIN */) {
    const allOrder = await prisma.order.findMany({
      include: {
        items: true
      }
    });
    return allOrder;
  }
  const ordersData = await prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: user.id
          }
        }
      }
    },
    include: {
      items: {
        include: {
          medicine: true
        }
      },
      user: true
    }
  });
  return ordersData;
};
var createOrders = async (payload) => {
  const { userId, items, shipping } = payload;
  if (!userId) {
    throw new Error("User ID is required");
  }
  let total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const result = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.price
        }))
      },
      ShippingAddress: {
        create: shipping
      }
    },
    include: {
      items: true,
      ShippingAddress: true
    }
  });
  return result;
};
var getOrderById = async (orderId, userId) => {
  const orderData = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    select: {
      id: true,
      userId: true
    }
  });
  if (orderData?.userId !== userId) {
    throw new Error("You are unauthrozied!");
  }
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId
    }
  });
  return order;
};
var updateOrderStatus = async (payload, orderId, user) => {
  const orderData = await prisma.order.findFirst({
    where: {
      id: orderId
    },
    select: {
      id: true,
      userId: true,
      status: true
    }
  });
  if (user.role === "CUSTOMER" /* CUSTOMER */ && orderData?.status === OrderStatus.PENDING && orderData.userId === user.id) {
    return await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: payload.status
      }
    });
  }
  if (user.role !== "SELLER" /* SELLER */) {
    throw new Error("Only Seller can update user status");
  }
  if (orderData?.status === OrderStatus.CANCELLED) {
    throw new Error("You can not cancelled order status");
  }
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: payload.status
    }
  });
  return result;
};
var ordersService = {
  getOrders,
  createOrders,
  getOrderById,
  updateOrderStatus
};

// src/modules/order/order.controller.ts
var getOrders2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are Unauthorized!");
    }
    const result = await ordersService.getOrders(user);
    res.status(209).json({
      success: true,
      message: "Order retrived successfully",
      result
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: true,
      message: "Order retrived failed",
      details
    });
  }
};
var createOrders2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { items, shipping } = req.body;
    if (!items || items.length === 0 && shipping) {
      throw new Error("Order must have at least one item or shopping address");
    }
    const result = await ordersService.createOrders({
      userId: user?.id,
      items,
      shipping
    });
    res.status(209).json({
      success: true,
      message: "Order created successfully",
      result
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: false,
      message: "Order created failed",
      details
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are Unauthorized!");
    }
    const { orderId } = req?.params;
    if (!orderId || Array.isArray(orderId)) {
      throw new Error("OrderId is required for show order details");
    }
    const result = await ordersService.getOrderById(orderId, user.id);
    res.status(209).json({
      success: true,
      message: "Order details retrived successfully",
      result
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: true,
      message: "Order details retrived failed",
      details
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { orderId } = req?.params;
    if (!orderId || Array.isArray(orderId)) {
      throw new Error("OrderId is required");
    }
    const result = await ordersService.updateOrderStatus(
      req.body,
      orderId,
      user
    );
    res.status(209).json({
      success: true,
      message: "Order status updated successfully",
      result
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: true,
      message: "Order status updated failed",
      details
    });
  }
};
var ordersController = {
  getOrders: getOrders2,
  createOrders: createOrders2,
  getOrderById: getOrderById2,
  updateOrderStatus: updateOrderStatus2
};

// src/modules/order/order.route.ts
var router4 = Router4();
router4.get(
  "/",
  auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  ordersController.getOrders
);
router4.get(
  "/:orderId",
  auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */),
  ordersController.getOrderById
);
router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), ordersController.createOrders);
router4.patch(
  "/:orderId",
  auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */),
  ordersController.updateOrderStatus
);

// src/modules/review/reviews.route.ts
import { Router as Router5 } from "express";

// src/modules/review/reviews.service.ts
var getReviews = async () => {
};
var createReviews = async (payload) => {
  const { data, user } = payload;
  const isCustomer = user.role === "CUSTOMER" /* CUSTOMER */;
  if (!isCustomer) {
    throw new Error("Only Customer can review their orders");
  }
  const orderData = await prisma.order.findFirst({
    select: {
      userId: true,
      status: true
    }
  });
  if (orderData?.userId !== user.id && orderData?.status !== OrderStatus.DELIVERED) {
    throw new Error("you are unauthorized!");
  }
  return await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      userId: user.id,
      medicineId: data.medicineId
    }
  });
};
var reviewsService = {
  createReviews,
  getReviews
};

// src/modules/review/reviews.controller.ts
var getReviews2 = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Reviews post successfull"
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: true,
      message: "Reviews post failed",
      details
    });
  }
};
var createReviews2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("you are unauthrozied!");
    }
    const result = await reviewsService.createReviews({
      data: req.body,
      user
    });
    res.status(200).json({
      success: true,
      message: "Reviews post successfull",
      result
    });
  } catch (error) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: true,
      message: "Reviews post failed",
      details
    });
  }
};
var reviewsController = {
  createReviews: createReviews2,
  getReviews: getReviews2
};

// src/modules/review/reviews.route.ts
var router5 = Router5();
router5.get("/", () => {
});
router5.post("/", auth_default("CUSTOMER" /* CUSTOMER */), reviewsController.createReviews);

// src/app.ts
var app = express2();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express2.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.send("Welcome to you from pharmacies API");
});
app.use("/api/v1/users", router3);
app.use("/api/v1/categories", router);
app.use("/api/v1/medicines", router2);
app.use("/api/v1/orders", router4);
app.use("/api/v1/reviews", router5);
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
