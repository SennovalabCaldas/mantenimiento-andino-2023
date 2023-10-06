import React, { useEffect } from "react";
import { ClientList } from "../../../components/Admin/Clients/ClientList";
import { useSelector } from "react-redux";
import { getAllClients } from "../../../actions/clientActions";
import { useDispatch } from "react-redux";

export const Clients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  const clients = useSelector((state) => state.client.clients);
  return (
    <div>
      <ClientList clients={clients} />
    </div>
  );
};
