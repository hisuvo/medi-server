import { Prisma } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { medicinePayload } from "./medinice.type";

const getMedicines = async (payload: {
  search: string;
  isActive: boolean | undefined;
  page: number;
  limit: number;
  skip: number;
}) => {
  const { search, isActive, limit, skip } = payload;

  const andConditions: MedicineWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: payload.search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          manufacturer: {
            contains: payload.search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          description: {
            contains: payload.search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    });
  }

  if (typeof isActive === "boolean") {
    andConditions.push({ isActive });
  }

  return await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    include: {
      reviews: true,
    },
  });
};

const getMedicineById = async (medicineId: string) => {
  return prisma.$transaction(async (tx) => {
    const medicineData = await tx.medicine.findUnique({
      where: {
        id: medicineId,
      },
    });

    return medicineData;
  });
};

const createMedicine = async (payload: medicinePayload) => {
  return await prisma.medicine.create({
    data: payload,
  });
};

const updateMedicine = async (
  payload: medicinePayload,
  medicineId: string,
  userId: string,
  isSeller: boolean,
) => {
  if (!isSeller) {
    throw new Error("Only sellers can update medicines");
  }

  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId: userId,
    },
  });

  if (!medicine) {
    throw new Error("You are not the owner of this medicine");
  }

  const result = await prisma.medicine.update({
    where: {
      id: medicineId,
    },
    data: payload,
  });

  return result;
};

const deleteMedicine = async (
  medicineId: string,
  userId: string,
  isSeller: boolean,
) => {
  if (!isSeller) {
    throw new Error("Only sellers can update medicines");
  }

  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId: userId,
    },
  });

  if (!medicine) {
    throw new Error("You are not the owner of this medicine");
  }

  const result = await prisma.medicine.delete({
    where: {
      id: medicineId,
    },
  });

  return result;
};

export const medicineService = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
