import { useSelect } from "downshift";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../../../actions/clientActions";
import { Loading } from "../../../Shared";

export const ClientList = () => {
  const dispatch = useDispatch();
  const clients = useSelect((state) => state);
  console.log(clients);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllClients());
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Verifica si sedes es undefined antes de mapear
  if (clients === undefined) {
    return <Loading />; // Muestra un mensaje de carga mientras esperas los datos
  }
  return (
    <>
      <div>Clients works!</div>
    </>
  );
};
