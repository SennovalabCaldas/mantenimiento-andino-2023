import React, { useEffect } from "react";
import "./ClientCard.scss"; // Asegúrate de importar tu archivo SCSS aquí
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../../../actions/clientActions";

export const ClientCard = () => {
  const dispatch = useDispatch();
  const clientsData = useSelector((state) => state.client.clients);
  console.log(clientsData);
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllClients());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div>
      {clientsData.map((client, index) => (
        <div key={index} className="container-client">
          <div className="box-client">
            <span className="title-client">{client.clientName}</span>
            <div>
              <strong>{client.direccion}</strong>
              <p>{client.joinDate}</p>
              <span>DESDE</span> <span>{client.joinDate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
