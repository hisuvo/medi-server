import { UserRole } from "../../constants/user-role";
import { UserStatus } from "../../constants/user-status";

export interface updateUserStatusPayload {
  status: UserStatus;
}

export interface updateUserProfilePayload {
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
}
