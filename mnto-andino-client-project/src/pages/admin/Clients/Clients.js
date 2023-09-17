import React, { useEffect } from "react";
import { ClientForm } from "../../../components/Admin";
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
      <ClientForm />
      <ClientList clients={clients} />
    </div>
  );
};
