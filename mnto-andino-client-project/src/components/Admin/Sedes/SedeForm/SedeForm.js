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

  const [direccion, setDireccion] = useState(sedeToEdit?.direccion || {});

  useEffect(() => {
    if (sedeToEdit) {
      setNombre(sedeToEdit.nombre);

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

    setDireccion({});
    setClearAddressForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Agregar validaciones de entrada aquí si es necesario

    const sedeData = {
      nombre: nombre,

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
