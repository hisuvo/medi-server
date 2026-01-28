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

export const medicineService = {
  getMedicine,
  getMedicineById,
  createMedicine,
};
