import { reviewsType } from "../../types/reviews";
import { userType } from "../../types/user";

export interface ReviewsCreatePayload {
  data: reviewsType;
  user: userType;
}
