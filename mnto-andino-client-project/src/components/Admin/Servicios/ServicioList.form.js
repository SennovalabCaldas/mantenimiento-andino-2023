import * as Yup from "yup";

export function initialValues(service) {
  return {
    name: service?.name || "",
    description: service?.description || "",
    assistanceType: service?.assistanceType || "",
    serviceLine: service?.serviceLine || "",
    photos: service?.photos || [],
    
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    description: Yup.string().required(true),
    assistanceType: Yup.string().required(true),
    serviceLine: Yup.string().required(true),
    photos: Yup.array().required(true),
  });
}
