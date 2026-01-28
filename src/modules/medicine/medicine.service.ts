import { date } from "better-auth";
import { prisma } from "../../lib/prisma";
import { medicinePayload } from "./medinice.type";

const getMedicine = async () => {
  return await prisma.medicine.findMany();
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

  const medicin = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId: userId,
    },
  });

  if (!medicin) {
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

export const medicineService = {
  getMedicine,
  getMedicineById,
  createMedicine,
  updateMedicine,
};
