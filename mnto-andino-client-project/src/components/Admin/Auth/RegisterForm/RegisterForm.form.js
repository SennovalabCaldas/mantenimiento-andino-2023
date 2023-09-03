import * as Yup from "yup";

export const initialValues = () => ({
  firstname: "",
  lastname: "",
  email: "",
  current_password: "",
  confirm_password: "",
});

export const validationSchema = () => {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string()
      .email("El correo no es válido")
      .required(true),
    current_password: Yup.string().required(true),
    confirm_password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("current_password")], "Las contraseñas no coinciden."),
    _error: Yup.string(), // Agregar un error general
  });
};
