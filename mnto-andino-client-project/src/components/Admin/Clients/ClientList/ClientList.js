import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { ENV } from "../../../../utils";
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../../../../actions/clientActions";

export const ClientList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseApi = ENV.BASE_PATH;
  const [previewImage, setPreviewImage] = useState(null);

  const clients = useSelector((state) => state.client.clients);
  console.log(clients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Identificador para el diálogo de edición
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Identificador para el diálogo de detalles

  const [avatar, setAvatar] = useState(null);
  const [national, setNational] = useState(true);
  const [active, setActive] = useState(true);
  const [clientName, setClientName] = useState("");
  const [editSupplierName, setEditClientName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [newClient, setNewClient] = useState({
    clientName: "",
    active: undefined,
    national: undefined, // Configúralo como indefinido
    avatar: [],
  });

  const handleOpenEditDialog = (client) => {
    setSelectedClient(client);
    setEditClientName(client.clientName);
    setIsEditDialogOpen(true); // Abre el diálogo de edición
  };

  // Función para abrir el diálogo de detalles del proveedor
  const handleOpenDetailDialog = (client) => {
    setSelectedClient(client);
    setIsDetailDialogOpen(true); // Abre el diálogo de detalles
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  const dispatch = useDispatch();
  const allies = useSelector((state) => state.client.allClients);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  const handleToggleActive = (client) => {
    // Actualiza el estado local
    const updatedClient = { ...client, active: !client.active };
    const updatedClients = allies.map((s) =>
      s._id === client._id ? updatedClient : s
    );
    setSelectedClient(updatedClient);
    // Envía una solicitud al servidor para actualizar el estado en la base de datos
    dispatch(updateClient(client._id, { active: updatedClient.active }));
    dispatch(getAllClients()); // Actualiza la lista de proveedores después de la actualización
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      console.log("Avatar:", avatar);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };
  const handleEdit = () => {
    if (selectedClient) {
      setClientName(selectedClient.clientName);
      setIsEditDialogOpen(true);
      handleOpenEditDialog(selectedClient);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteClient(id));
      await dispatch(getAllClients());
    } catch (error) {
      console.error("Error al eliminar el aliado:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      ...newClient,
      clientName: clientName,
      active: active,
      national: national,
      avatar: avatar,
    };

    if (data._id) {
      await dispatch(updateClient(data._id, data));
    } else {
      await dispatch(createClient(data));
    }
    await dispatch(getAllClients());
  };

  return (
    <div>
      <h2>Clientes</h2>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              Crear Cliente
            </Typography>
            <form encType="multipart/form-data">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Nombre"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                {/* Button to trigger file input */}
                <Button
                  onClick={() => document.getElementById("imageUpload").click()}
                  variant="contained"
                  color="primary"
                >
                  Subir Imagen
                </Button>
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Vista previa de la imagen"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginLeft: "10px",
                    }}
                  />
                )}
                <Switch
                  checked={newClient.active}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      active: e.target.checked,
                    })
                  }
                  color="primary"
                  inputProps={{ "aria-label": "Cliente activo" }}
                />
                <Typography>
                  {newClient.active ? "Cliente activo" : "Cliente inactivo"}
                </Typography>
                <Switch
                  checked={newClient.national}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      national: e.target.checked,
                    })
                  }
                  color="primary"
                  inputProps={{ "aria-label": "Cliente nacional" }}
                />
                <Typography>
                  {newClient.national
                    ? "Cliente nacional"
                    : "Cliente internacional"}
                </Typography>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  Crear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <h3>Lista de Clientes</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Activa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.clientName}</TableCell>
                <TableCell>
                  {client.avatar && (
                    <img
                      src={`${baseApi}${client.avatar}`}
                      alt="Imagen de previsualización"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={client.active}
                    onChange={() => handleToggleActive(client)}
                    color="primary"
                    inputProps={{ "aria-label": "Proveedor activo" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDetailDialog(client)}
                    variant="contained"
                    color="primary"
                  >
                    Detalles
                  </Button>

                  <Button
                    onClick={() => handleDelete(client._id)}
                    variant="contained"
                    color="primary"
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        fullWidth
      >
        {selectedClient && (
          <>
            <DialogTitle>Detalles del Cliente</DialogTitle>
            <DialogContent>
              <Typography>Nombre: {selectedClient.clientName}</Typography>
              <Typography>
                Activa: {selectedClient.active ? "Sí" : "No"}
              </Typography>
              <Typography>
                Imagen:{" "}
                {selectedClient.avatar && (
                  <img
                    src={`${baseApi}${selectedClient.avatar}`}
                    alt="Imagen de previsualización"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
};
