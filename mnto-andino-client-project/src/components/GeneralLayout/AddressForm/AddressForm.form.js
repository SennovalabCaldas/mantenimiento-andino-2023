import * as Yup from "yup";

export function initialValues(address) {
  return {
    country:address?.country || "",
    state:address?.state || "",
    departamento:address?.departamento || "",
    municipio:address?.municipio || "",
    selectedStreet:address?.selectedStreet || "",
    numero1:address?.numero1 || "",
    numero2:address?.numero2 || "",
    numero3:address?.numero3 || "",
    selectedLetter1:address?.selectedLetter1 || "", 
    selectedLetter2:address?.selectedLetter2 || "",
    selectedLetter3:address?.selectedLetter3 || "",
    selectedZone:address?.selectedZone || "",
    barrio:address?.barrio || "",
    complementoDireccion:address?.complementoDireccion || "",
    nombreEdificio:address?.nombreEdificio || "",
    caracteristicasAdicionales:address?.caracteristicasAdicionales || "",
    numeroLocal:address?.numeroLocal || "",
  };
}

export function validationSchema() {
  return Yup.object({
    selectedStreet: Yup.string().required(true),
    numero1: Yup.number().required(true),
    barrio: Yup.string().required(true),
  });
}
