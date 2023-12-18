import * as yup from "yup";



export const PhoneNumberVerifySchema = yup.object().shape({
  phoneNumber: yup.number().required(),
});



export const UpdateProfileSchema = yup.object().shape({
  address: yup.string().required(),
  dateOfBirth: yup.string().min(9).max(10).required(),
  gender: yup.string().required(),
  phoneNumber: yup
    .string()
    .min(
      14,
      "Please input a valid phone number that does not begin with a zero."
    )
    .required(
      "Please input a valid phone number that does not begin with a zero."
    ),
});

export const UpdateDoctorProfileInfoSchema = yup.object().shape({
  specialty: yup.string(),
  medicalLicense: yup.string(),
  school: yup.string().required(),
  course: yup.string().required(),
});
export const UpdateDoctorProfileSchema = yup.object().shape({
  about: yup.string().required(),
  address: yup.string().required(),
  gender: yup.string().required(),
  specialty: yup.string(),
  medicalLicense: yup.string(),
  phoneNumber: yup.number().required(),
  language: yup.string().required(),
  school: yup.string().required(),
  course: yup.string().required(),
});

export const SpecialtyInfoSchema = yup.object().shape({
  specialty: yup.string(),
});

export const BIOSettingSchema = yup.object().shape({
  bio: yup.string().required(),
});

export const EducationSettingSchema = yup.object().shape({
  school: yup.string().required(),
  areaOfStudy: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
});

export const SpecialitiesSettingSchema = yup.object().shape({
  specialty: yup.string().required(),
});
export const LanguagesSettingSchema = yup.object().shape({
  language: yup.string().required(),
  proficiencyLevel: yup.string().required(),
});


export const CancelBookingSchema = yup.object().shape({
  bookingcancelmassage: yup.string().required(),
});