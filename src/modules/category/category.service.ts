import { CreateCategoryPayload } from "./category.type";

const getCategory = async () => {
  return "this is Category";
};

const createCategory = async (payload: CreateCategoryPayload) => {
  console.log(payload);
  return "this is Category";
};

export const categoryService = {
  getCategory,
  createCategory,
};
