import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SedeList from "../../../components/Admin/Sedes/ListSedes/SedesList";
import SedeForm from "../../../components/Admin/Sedes/SedeForm/SedeForm";
import { useDispatch, useSelector } from "react-redux";
import { createSede, getAllSedes } from "../../../actions/sedesActions";
import { Button } from "@mui/material";
import "./Sedes.scss";

export const Sedes = () => {
  const dispatch = useDispatch();
  const sedes = useSelector((state) => state.sede.allSedes.sedes);
  const [showForm, setShowForm] = useState(false);

  const handleCreateSedeClick = () => {
    setShowForm(true);
  };

  // Se ejecutará cada vez que dispatch cambie
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllSedes());
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Verifica si sedes es undefined antes de mapear
  if (sedes === undefined) {
    return <div>Cargando</div>; // Muestra un mensaje de carga mientras esperas los datos
  }

  return (
    <>
      <h2>Sedes</h2>
      <div className="sedes-page">
        <Button
          onClick={handleCreateSedeClick}
          variant="contained"
          className="sedes_add"
        >
          Crear Sede
        </Button>
        {showForm && <SedeForm showForm={setShowForm} />}
        <ToastContainer />
        <SedeList sedes={sedes} />
      </div>
    </>
  );
};
