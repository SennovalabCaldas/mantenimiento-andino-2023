import React, { useEffect } from "react";
import "./WebClient.scss";
import { ClientCard, Loading } from "../../../components/Shared";
import { useDispatch, useSelector } from "react-redux";
import { Mapa } from "../../../components/GeneralLayout";
import { getAllClients } from "../../../actions/clientActions";

export const WebClients = () => {
  const dispatch = useDispatch();
  const clientsData = useSelector((state) => state.client.allClients);
  console.log(clientsData);
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllClients());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="web-clients-container">
      <Mapa className="mapa"></Mapa>
      <ClientCard className="client-card"></ClientCard>
    </div>
  );
};
