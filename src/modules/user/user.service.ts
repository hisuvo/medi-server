import { UserRole } from "../../constants/user-role";
import { prisma } from "../../lib/prisma";
import { userType } from "../../types/user";
import {
  updateUserProfilePayload,
  updateUserStatusPayload,
} from "./update-user.type";

// admins can show all user data
// customers and sellers can show only their own data
const getUsers = async (user: userType) => {
  if (user.role === UserRole.ADMIN) {
    const allUser = await prisma.user.findMany();
    return allUser;
  }

  const ownUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return ownUser;
};

const updateProfile = async (
  payload: updateUserProfilePayload,
  user: userType,
) => {
  let profileData = payload;

  // admin can not change her status and role
  if (user.role === UserRole.ADMIN) {
    const { status, role, ...withoutStatusRole } = payload;
    profileData = withoutStatusRole;
  }

  const result = await prisma.user.update({
    where: {
      id: user.id,
      email: user.email,
    },
    data: profileData,
  });

  return result;
};

const updateUserStatus = async (
  payload: updateUserStatusPayload,
  userId: string,
  adminUserId: string,
  isAdmin: boolean,
) => {
  if (!isAdmin) {
    throw new Error("Only Admin can update user status");
  }

  if (userId === adminUserId) {
    throw new Error("Admin cannot change own status");
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};

export const userService = {
  getUsers,
  updateUserStatus,
  updateProfile,
};
