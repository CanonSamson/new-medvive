import * as yup from "yup";

export const RatingSchema = yup.object().shape({
  review: yup.string().required(),
  stars: yup.string().required(),
});
