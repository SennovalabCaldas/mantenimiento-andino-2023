import * as Yup from "yup";

export const initialValues = () => {
  return {
    email: "",
    current_password: "",
  };
};

export const validationSchema = () =>
  Yup.object({
    email: Yup.string().required("El correo electrónico es obligatorio"),
    current_password: Yup.string().required("La contraseña es obligatoria"),
  });
