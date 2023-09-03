import * as Yup from "yup";

export function initialValues(user) {
  return {
    avatar: user?.avatar || "",
    fileAvatar: null,
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    role: user?.role || "",
    sede: user ? user.sede : "",
    current_password: "",
  };
}

export function validationSchema(user) {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    role: Yup.string().required(true),
    sede: Yup.string().required(true),
    current_password: user ? Yup.string() : Yup.string().required(true),
  });
}