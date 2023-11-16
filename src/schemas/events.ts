import * as yup from "yup";

enum status {
  pending = "pending",
  confirmed = "confirmed",
  canceled = "canceled",
  completed = "completed",
}

export const addCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

export const addEventSchema = yup.object().shape({
  title: yup.string().required("Event title is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End Date is required"),
  location: yup.string().required("Location is required"),
  price: yup.string().required("Price is required"),

  categoryId: yup.string().required("Event Category is required"),
});
export const bookEventSchema = yup.object().shape({
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End Date is required"),
  email: yup.string().email().required("Email is required"),
  contactNo: yup
    .string()
    .matches(/^(?:\+\d{1,3}\s?)?\d{1,14}$/, "Contact number is not valid")
    .required("Contact Number is required"),
  adults: yup.number().required("Number of adults is required").default(1),
  children: yup.number().optional(),
  daysBooked: yup.number().required("Number of days is required"),
  totalAmount: yup.number().required("Total is required"),
});
export const updateEventSchema = yup.object().shape({
  title: yup.string().optional(),
  description: yup.string().optional(),
  startDate: yup.date().optional(),
  endDate: yup.date().optional(),
  location: yup.string().optional(),
  price: yup.string().optional(),
  categoryId: yup.string().optional(),
});

export const updateBookingStatusSchema = yup.object().shape({
  status: yup
    .string()
    .oneOf(Object.values(status), "Select valid status")
    .required("Status is required"),
  startDate: yup.date().optional(),
  endDate: yup.date().optional(),
});
export const cancelBookingSchema = yup.object().shape({});
