import * as yup from "yup";

export const RatingSchema = yup.object().shape({
  review: yup.string().required(),
  stars: yup.string().required(),
});

export const BookAppointmentSchema = yup.object().shape({
  date: yup.string().required(),
  time: yup.string().required(),
});
