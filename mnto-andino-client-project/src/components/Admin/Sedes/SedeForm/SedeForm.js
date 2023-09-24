// // import React, { useEffect, useState } from "react";
// // import { AddressForm } from "../../../GeneralLayout/AddressForm/AddressForm";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import {
// //   createSede,
// //   getAllSedes,
// //   updateSede,
// // } from "../../../../actions/sedesActions";
// // import { useDispatch } from "react-redux";
// // import { Button, FormControl, TextField } from "@mui/material";

// // const SedeForm = ({ showForm, sedeToEdit, onClose }) => {
// //   // Para limpiar los campos después de guardar una nueva sede
// //   const dispatch = useDispatch();
// //   const [clearAddressForm, setClearAddressForm] = useState(false);
// //   const [nombre, setNombre] = useState(sedeToEdit?.nombre || "");
// //   const [telefonoContacto, setTelefonoContacto] = useState(
// //     sedeToEdit?.telefono_contacto || ""
// //   );
// //   const [direccion, setDireccion] = useState(sedeToEdit?.direccion || {});
// //   const [showToast, setShowToast] = useState(false);

// //   useEffect(() => {
// //     // Si hay una sede para editar, actualizamos los estados con los datos de la sede
// //     if (sedeToEdit) {
// //       setNombre(sedeToEdit.nombre);
// //       setTelefonoContacto(sedeToEdit.telefono_contacto);
// //       setDireccion(sedeToEdit.direccion);
// //     }
// //   }, [sedeToEdit]);

// //   const handleAddressData = (data) => {
// //     setDireccion(data);
// //   };

// //   const handleSaveSede = async (sedeData) => {
// //     try {
// //       await dispatch(createSede(sedeData));
// //       toast.success("¡La sede se ha creado exitosamente!");
// //       await dispatch(getAllSedes());
// //       showForm(false); // Oculta el formulario después de guardar o actualizar
// //     } catch (error) {
// //       console.error("Error al guardar la sede:", error);
// //       toast.error("Hubo un error al guardar la sede.");
// //     }
// //   };

// //   const clearForm = () => {
// //     setNombre("");
// //     setTelefonoContacto("");
// //     setDireccion({});
// //     setClearAddressForm(false);
// //   };

// //   const handleFormSubmit = async () => {
// //     const sedeData = {
// //       nombre: nombre,
// //       telefono_contacto: telefonoContacto,
// //       direccion: direccion,
// //     };
// //     try {
// //       if (sedeToEdit) {
// //         await dispatch(updateSede(sedeToEdit._id, sedeData));
// //         await dispatch(getAllSedes());
// //         // clearForm();
// //         toast.success("¡La sede se ha actualizado exitosamente!");
// //         // showForm(false);
// //         onClose();
// //       } else {
// //         handleSaveSede(sedeData);
// //         clearForm();
// //         showForm(false);
// //       }
// //     } catch (error) {
// //       toast.error("Hubo un error al guardar la sede.");
// //     }
// //   };

// //   // Detectar cuando se muestra el Toast y ocultar el formulario
// //   useEffect(() => {
// //     if (showToast) {
// //       toast.success("¡La sede se ha creado exitosamente!");
// //       showForm(false);
// //     }
// //   }, [showToast]);

// //   return (
// //     <>
// //       <FormControl onSubmit={handleFormSubmit}>
// //         <TextField
// //           label="Nombre de la sede"
// //           placeholder="Nombre de la sede"
// //           value={nombre}
// //           onChange={(e) => setNombre(e.target.value)}
// //         />
// //         <TextField
// //           label="Nombre de contacto"
// //           placeholder="Correo de contacto"
// //           value={telefonoContacto}
// //           onChange={(e) => setTelefonoContacto(e.target.value)}
// //         />
// //         <AddressForm
// //           onSelectedData={handleAddressData}
// //           addressData={direccion ?? {}}
// //           clearForm={clearAddressForm}
// //         />

// //         <Button type="submit">Guardar sede</Button>
// //       </FormControl>
// //       <ToastContainer />
// //     </>
// //   );
// // };

// // export default SedeForm;
// import React, { useEffect, useState } from "react";
// import { AddressForm } from "../../../GeneralLayout/AddressForm/AddressForm";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   createSede,
//   getAllSedes,
//   updateSede,
// } from "../../../../actions/sedesActions";
// import { useDispatch } from "react-redux";
// import { Button, FormControl, TextField } from "@mui/material";

// const SedeForm = ({ showForm, sedeToEdit, onClose }) => {
//   const dispatch = useDispatch();
//   const [clearAddressForm, setClearAddressForm] = useState(false);
//   const [nombre, setNombre] = useState(sedeToEdit?.nombre || "");
//   const [telefonoContacto, setTelefonoContacto] = useState(
//     sedeToEdit?.telefono_contacto || ""
//   );
//   const [direccion, setDireccion] = useState(sedeToEdit?.direccion || {});

//   useEffect(() => {
//     if (sedeToEdit) {
//       setNombre(sedeToEdit.nombre);
//       setTelefonoContacto(sedeToEdit.telefono_contacto);
//       setDireccion(sedeToEdit.direccion);
//     }
//   }, [sedeToEdit]);

//   const handleAddressData = (data) => {
//     setDireccion(data);
//   };

//   const handleSaveSede = async (sedeData) => {
//     try {
//       await dispatch(createSede(sedeData));
//       toast.success("¡La sede se ha creado exitosamente!");
//       await dispatch(getAllSedes());
//       showForm(false);
//     } catch (error) {
//       console.error("Error al guardar la sede:", error);
//       toast.error("Hubo un error al guardar la sede.");
//     }
//   };

//   const clearForm = () => {
//     setNombre("");
//     setTelefonoContacto("");
//     setDireccion({});
//     setClearAddressForm(false);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault(); // Evitar el envío del formulario por defecto

//     const sedeData = {
//       nombre: nombre,
//       telefono_contacto: telefonoContacto,
//       direccion: direccion,
//     };

//     try {
//       if (sedeToEdit) {
//         await dispatch(updateSede(sedeToEdit._id, sedeData));
//         await dispatch(getAllSedes());
//         toast.success("¡La sede se ha actualizado exitosamente!");
//         onClose();
//       } else {
//         await handleSaveSede(sedeData);
//         clearForm();
//         showForm(false);
//       }
//     } catch (error) {
//       toast.error("Hubo un error al guardar la sede.");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit}>
//         <FormControl>
//           <TextField
//             label="Nombre de la sede"
//             placeholder="Nombre de la sede"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//           />
//           <TextField
//             label="Nombre de contacto"
//             placeholder="Correo de contacto"
//             value={telefonoContacto}
//             onChange={(e) => setTelefonoContacto(e.target.value)}
//           />
//           <AddressForm
//             onSelectedData={handleAddressData}
//             addressData={direccion ?? {}}
//             clearForm={clearAddressForm}
//           />
//           <Button type="submit">Guardar sede</Button>
//         </FormControl>
//       </form>
//       <ToastContainer />
//     </>
//   );
// };

// export default SedeForm;
import React, { useEffect, useState } from "react";
import { AddressForm } from "../../../GeneralLayout/AddressForm/AddressForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createSede,
  getAllSedes,
  updateSede,
} from "../../../../actions/sedesActions";
import { useDispatch } from "react-redux";
import { Button, FormControl, TextField } from "@mui/material";

const SedeForm = ({ showForm, sedeToEdit, onClose }) => {
  const dispatch = useDispatch();
  const [clearAddressForm, setClearAddressForm] = useState(false);
  const [nombre, setNombre] = useState(sedeToEdit?.nombre || "");
  const [telefonoContacto, setTelefonoContacto] = useState(
    sedeToEdit?.telefono_contacto || ""
  );
  const [emailContacto, setEmailContacto] = useState(
    sedeToEdit?.email_contacto || ""
  );
  const [direccion, setDireccion] = useState(sedeToEdit?.direccion || {});

  useEffect(() => {
    if (sedeToEdit) {
      setNombre(sedeToEdit.nombre);
      setTelefonoContacto(sedeToEdit.telefono_contacto);
      setEmailContacto(sedeToEdit.email_contacto);
      setDireccion(sedeToEdit.direccion);
    }
  }, [sedeToEdit]);

  const handleAddressData = (data) => {
    setDireccion(data);
  };

  const handleSaveSede = async (sedeData) => {
    try {
      await dispatch(createSede(sedeData));
      toast.success("¡La sede se ha creado exitosamente!");
      await dispatch(getAllSedes());
      showForm(false);
    } catch (error) {
      console.error("Error al guardar la sede:", error);
      toast.error("Hubo un error al guardar la sede.");
    }
  };

  const clearForm = () => {
    setNombre("");
    setTelefonoContacto("");
    setEmailContacto("");
    setDireccion({});
    setClearAddressForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Agregar validaciones de entrada aquí si es necesario

    const sedeData = {
      nombre: nombre,
      telefono_contacto: telefonoContacto,
      email_contacto: emailContacto,
      direccion: direccion,
    };
console.log(sedeData);
    try {
      if (sedeToEdit) {
        console.log("sedeToEdit._id", sedeToEdit);
        await dispatch(updateSede(sedeToEdit._id, sedeData));
        await dispatch(getAllSedes());
        toast.success("¡La sede se ha actualizado exitosamente!");
        onClose();
      } else {
        await handleSaveSede(sedeData);
        clearForm();
        showForm(false);
      }
    } catch (error) {
      toast.error("Hubo un error al guardar la sede.");
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <TextField
            placeholder="Nombre de la sede"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required // Campo obligatorio
          />
          <TextField
            placeholder="Telefono de contacto"
            value={telefonoContacto}
            onChange={(e) => setTelefonoContacto(e.target.value)}
            required // Campo obligatorio
          />
          <TextField
            placeholder="Correo de contacto"
            value={emailContacto}
            onChange={(e) => setEmailContacto(e.target.value)}
            required // Campo obligatorio
          />
          <AddressForm
            onSelectedData={handleAddressData}
            addressData={direccion ?? {}}
            clearForm={clearAddressForm}
          />
          <Button type="submit">Guardar sede</Button>
          <Button type="button" onClick={onClose}>
            Cancelar
          </Button>
        </FormControl>
      </form>
      <ToastContainer />
    </>
  );
};

export default SedeForm;
