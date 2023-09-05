import React, { useEffect } from "react";
import "./WebClient.scss";
import { getAllSedes } from "../../../actions/sedesActions";
import { Loading } from "../../../components/Shared";
import { useDispatch, useSelector } from "react-redux";

export const WebClients = () => {
  const dispatch = useDispatch();
  const clientsData = useSelector((state) => state.sede.allSedes);
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllSedes());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Verificar si clientsData contiene el array de sedes
  if (!clientsData || !clientsData.clients || !Array.isArray(clientsData.sedes)) {
    return <Loading />; // Puedes mostrar un indicador de carga o mensaje de error mientras se obtienen los datos
  }
  return (
    <>
      {clientsData.map((client) => (
        <div key={client.id} className="btn-client">
          {client.name}
        </div>
      ))}
    </>
  );
};
