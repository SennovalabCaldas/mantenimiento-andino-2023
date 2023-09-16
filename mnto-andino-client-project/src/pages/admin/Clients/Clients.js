import React from "react";
import { ClientForm } from "../../../components/Admin";
import { ClientList } from "../../../components/Admin/Clients/ClientList";

export const Clients = () => {
  return (
    <div>
      <h2>Clients works!</h2>
      <ClientForm />
      <ClientList />
    </div>
  );
};
