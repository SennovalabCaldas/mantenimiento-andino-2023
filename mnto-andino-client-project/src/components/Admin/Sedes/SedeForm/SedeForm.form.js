import * as Yup from "yup";


export function validationSchema() {
  return Yup.object({
    nombre: Yup.string()
      .required(true)
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no debe exceder los 50 caracteres"),
    nombre_contacto: Yup.string().required(true),
    telefono_contacto: Yup.string().required(true),
    email_contacto: Yup.string().required(true),
  });
}
