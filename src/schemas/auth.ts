import * as yup from "yup";

enum Gender {
  male = "male",
  female = "female",
  others = "others",
}

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email Address is required"),
  gender: yup
    .string()
    .oneOf(Object.values(Gender), "Select valid gender")
    .required("Gender is required"),
  contactNo: yup
    .string()
    .matches(/^(?:\+\d{1,3}\s?)?\d{11,14}$/, "Contact number is not valid")
    .required("Contact Number is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16, "Password is too long - should be 16 chars maximum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?])[a-zA-Z\d!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?-]{8,16}$/,
      "Password must include at least one number, one special character, one uppercase and one lowercase character."
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    // @ts-ignore
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
export const addUserSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email Address is required"),
  gender: yup
    .string()
    .oneOf(Object.values(Gender), "Select valid gender")
    .required("Gender is required"),
  role: yup
    .string()
    .oneOf(Object.values(Role), "Select valid role")
    .required("User role is required"),
  contactNo: yup
    .string()
    .matches(/^(?:\+\d{1,3}\s?)?\d{11,14}$/, "Contact number is not valid")
    .required("Contact Number is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16, "Password is too long - should be 16 chars maximum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?])[a-zA-Z\d!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?-]{8,16}$/,
      "Password must include at least one number, one special character, one uppercase and one lowercase character."
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    // @ts-ignore
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required("Email Address is required"),
  password: yup.string().required("Password is required"),
});

export const updateProfileSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  // contactNo: yup
  //   .string()
  //   .matches(/^(?:\+\d{1,3}\s?)?\d{1,14}$/, "Contact number is not valid")
  //   .required("Contact Number is required"),
  contactNo: yup
    .string()
    .matches(/^(?:\+\d{1,3}\s?)?\d{11,14}$/, "Contact number is not valid")
    .required("Contact Number is required"),
  gender: yup.string().oneOf(Object.values(Gender), "Select valid gender"),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16, "Password is too long - should be 16 chars maximum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?])[a-zA-Z\d!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?-]{8,16}$/,
      "Password must include at least one number, one special character, one uppercase and one lowercase character."
    )
    .required("New Password is required"),
});

export const updateAdminSchema = yup.object().shape({
  role: yup
    .string()
    .oneOf(Object.values(Role), "Select valid role")
    .required("User role is required"),
});
