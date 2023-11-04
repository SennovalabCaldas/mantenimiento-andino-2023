import * as Yup from "yup";

export function initialValues(service) {
  return {
    name: service?.name || "",
    description: service?.description || "",
    photos: service?.photos || [],
    // categoryService: service?.categoryService || "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    description: Yup.string().required(true),
    photos: Yup.array().required(true),
    // categoryService: Yup.string(),
  });
}
