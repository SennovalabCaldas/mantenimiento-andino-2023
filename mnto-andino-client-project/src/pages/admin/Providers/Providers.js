import React, { useState, useEffect } from "react";
import { Tabs, Tab, Paper, Typography, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../../actions/clientActions";

export const Providers = () => {
  const [activeClients, setActiveClients] = useState([]);
  const [inactiveClients, setInactiveClients] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Lógica para obtener la lista de clientes y filtrar activos/inactivos
        const providers = await dispatch(getAllClients());
        console.log(providers);
        const active = providers.providers.filter((client) => client.active);
        const inactive = providers.providers.filter((client) => !client.active);
        setActiveClients(active);
        setInactiveClients(inactive);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCreateClient = () => {
    console.log("Crear nuevo cliente");
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Proveedores
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClient}
        style={{ margin: "10px" }}
      >
        Crear Nuevo Proveedor
      </Button>

      <Paper elevation={3}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Proveedores Activos" />
          <Tab label="Proveedores Inactivos" />
          <Tab label="Proveedores por categorías" />
        </Tabs>
      </Paper>
      <TabPanel value={currentTab} index={0}>
        {/* Muestra la lista de clientes activos */}
        {activeClients.map((client) => (
          <div key={client._id}>
            <Typography variant="subtitle1">{client.nombre}</Typography>
            {/* Mostrar más detalles del cliente */}
          </div>
        ))}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {/* Muestra la lista de clientes inactivos */}
        {inactiveClients.map((client) => (
          <div key={client._id}>
            <Typography variant="subtitle1">{client.nombre}</Typography>
            {/* Mostrar más detalles del cliente */}
          </div>
        ))}
      </TabPanel>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
