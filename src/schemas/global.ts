import * as yup from "yup";

export const addFaqSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  answer: yup.string().required("Answer is required"),
});

export const updateFaqSchema = yup.object().shape({
  question: yup.string().optional(),
  answer: yup.string().optional(),
});

export const addFeedback = yup.object().shape({
  feedback: yup.string().required("Feedback is required"),
});

export const addBlogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
export const updateBlogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
export const addPageSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
export const updatePageSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export const giveReviewSchema = yup.object().shape({
  review: yup.string().required("Review is required"),
  rating: yup.number().required("Rating is required"),
});
export const sendMessageSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  message: yup.string().required("Message is required"),
  phone: yup
    .string()
    .matches(/^(?:\+\d{1,3}\s?)?\d{11,14}$/, "Contact number is not valid")
    .required("Contact Number is required"),
  source: yup.string().required("Where did you hear about us is required"),
});

export const sendEmailToSubscribersSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});
