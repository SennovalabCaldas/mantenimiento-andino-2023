import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { AddressForm } from "../../../GeneralLayout/AddressForm/AddressForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createSede,
  getAllSedes,
  updateSede,
} from "../../../../actions/sedesActions";
import { useDispatch } from "react-redux";

const SedeForm = ({ showForm, sedeToEdit, onClose }) => {
  // Para limpiar los campos después de guardar una nueva sede
  const dispatch = useDispatch();
  const [clearAddressForm, setClearAddressForm] = useState(false);
  const [nombre, setNombre] = useState(sedeToEdit?.nombre || "");
  const [nombreContacto, setNombreContacto] = useState(
    sedeToEdit?.nombre_contacto || ""
  );
  const [direccion, setDireccion] = useState(sedeToEdit?.direccion || {});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Si hay una sede para editar, actualizamos los estados con los datos de la sede
    if (sedeToEdit) {
      setNombre(sedeToEdit.nombre);
      setNombreContacto(sedeToEdit.nombre_contacto);
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
      showForm(false); // Oculta el formulario después de guardar o actualizar
    } catch (error) {
      console.error("Error al guardar la sede:", error);
      toast.error("Hubo un error al guardar la sede.");
    }
  };

  const clearForm = () => {
    setNombre("");
    setNombreContacto("");
    setDireccion({});
    setClearAddressForm(false);
  };

  const handleFormSubmit = async () => {
    const sedeData = {
      nombre: nombre,
      nombre_contacto: nombreContacto,
      direccion: direccion,
    };
    try {
      if (sedeToEdit) {
        await dispatch(updateSede(sedeToEdit._id, sedeData));
        await dispatch(getAllSedes());
        // clearForm();
        toast.success("¡La sede se ha actualizado exitosamente!");
        // showForm(false);
        onClose();
      } else {
        handleSaveSede(sedeData);
        clearForm();
        showForm(false);
      }
    } catch (error) {
      toast.error("Hubo un error al guardar la sede.");
    }
  };

  // Detectar cuando se muestra el Toast y ocultar el formulario
  useEffect(() => {
    if (showToast) {
      toast.success("¡La sede se ha creado exitosamente!");
      showForm(false);
    }
  }, [showToast]);

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input
          label="Nombre de la sede"
          placeholder="Nombre de la sede"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Form.Input
          label="Nombre de contacto"
          placeholder="Nombre de contacto"
          value={nombreContacto}
          onChange={(e) => setNombreContacto(e.target.value)}
        />
        <AddressForm
          onSelectedData={handleAddressData}
          addressData={direccion ?? {}}
          clearForm={clearAddressForm}
        />

        <Button type="submit">Guardar sede</Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default SedeForm;
