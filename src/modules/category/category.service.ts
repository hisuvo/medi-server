import { prisma } from "../../lib/prisma";
import { CreateCategoryPayload } from "./create-category.type";

const getCategory = async () => {
  return await prisma.category.findMany();
};

const createCategory = async (payload: CreateCategoryPayload) => {
  const res = await prisma.category.create({
    data: payload,
  });

  return res;
};

export const categoryService = {
  getCategory,
  createCategory,
};

/**
[
  {
    "name": "Pain & Fever",
    "description": "Medicines for relieving pain, headache, fever, and mild inflammation"
  },
  {
    "name": "Cold & Flu",
    "description": "Medicines for cold, cough, runny nose, flu symptoms"
  },
  {
    "name": "Digestive Health",
    "description": "Medicines for stomach issues, acidity, indigestion, and diarrhea"
  },
  {
    "name": "Vitamins & Supplements",
    "description": "Multivitamins, minerals, and dietary supplements"
  },
  {
    "name": "Skin Care",
    "description": "Creams, ointments, and medicines for skin problems"
  },
  {
    "name": "Allergy & Asthma",
    "description": "Medicines for allergic reactions, asthma, and respiratory issues"
  },
  {
    "name": "Diabetes Care",
    "description": "Medicines and insulin for diabetes management"
  },
  {
    "name": "Heart & Blood Pressure",
    "description": "Medicines for heart conditions, blood pressure, and cholesterol"
  },
  {
    "name": "Children & Baby Care",
    "description": "Medicines suitable for infants and children"
  },
  {
    "name": "Women's Health",
    "description": "Medicines related to reproductive health, hormonal balance, etc."
  },
  {
    "name": "Men's Health",
    "description": "Medicines for male-specific health issues"
  },
  {
    "name": "Eye & Ear Care",
    "description": "Medicines for eye infections, ear pain, and related issues"
  },
  {
    "name": "Oral Care",
    "description": "Toothpaste, mouthwash, and medicines for oral health"
  }
]

 */
