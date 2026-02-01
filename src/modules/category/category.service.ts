import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateCategoryPayload } from "./create-category.type";

const getCategory = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          medicines: true,
        },
      },
    },
  });
};

const getCategoryById = async ({ categoryId }: { categoryId: string }) => {
  return await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
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
              email: true,
            },
          },
        },
      },
    },
  });
};

const updateCategory = async (categoryId: string, payload: Category) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },

    select: {
      id: true,
    },
  });

  const result = await prisma.category.update({
    where: {
      id: category.id,
    },
    data: payload,
  });

  return result;
};

const createCategory = async (payload: CreateCategoryPayload) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const deleteCategory = async (categoryId: string) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },

    select: {
      id: true,
    },
  });

  const result = await prisma.category.delete({
    where: {
      id: category.id,
    },
  });

  return result;
};

export const categoryService = {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
