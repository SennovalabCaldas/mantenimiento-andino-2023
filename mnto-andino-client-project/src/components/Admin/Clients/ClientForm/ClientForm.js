import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  InputLabel,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AddressForm } from "../../../GeneralLayout";
import "./ClientForm.scss";
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../../../../actions/clientActions";
import { useDispatch, useSelector } from "react-redux";

export const ClientForm = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.allClients);
  const [direccion, setDireccion] = useState({});
  const [clientName, setClientName] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const [clearAddressForm, setClearAddressForm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageData, setPageData] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClient, setEditingClient] = useState({
    clientName: "",
    direccion: {},
    active: false,
    avatar: [],
    joinDate: "",
  });

  const handleAddressData = (data) => {
    setDireccion(data);
  };

  const handleClientNameChange = (e) => {
    setClientName(e.target.value); // Actualiza el estado clientName con el nuevo valor
  };

  const handleJoinDate = (e) => {
    setJoinDate(e.target.value); // Establece la fecha en el estado joinDate
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleCreate = () => {
    setEditingClient({
      clientName: "",
      direccion: {},
      active: false,
      avatar: [],
      joinDate: "",
    });
    setOpenDialog(true);
  };

  const handleEdit = (id) => {
    console.log("Editando cliente:", id);
    const clientToEdit = clients.find((item) => item._id === id);
    setEditingClient({
      ...clientToEdit,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (postId) => {
    try {
      await dispatch(deleteClient(postId));
      await dispatch(getAllClients());
      // Actualiza el  estado de las noticias después de eliminar una noticia
      const updateClients = clients.filter((item) => item.id !== postId);

      // Verificar si la página actual es mayor o igual a la cantidad de páginas disponibles
      const totalPages = Math.ceil(updateClients.length / rowsPerPage);
      if (page >= totalPages) {
        setPage(Math.max(totalPages - 1, 0)); // Establecer la página actual al último índice o a 0 si no hay páginas disponibles
      }
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };

  const handleSave = async (data) => {
    setOpenDialog(false);
    data.clientName = clientName;
    data.direccion = direccion;
    data.joinDate = joinDate;
    data.active = editingClient.active;
    data.avatar = avatar;
    if (data._id) {
      // Editing existing news
      console.log("Updating clients", data._id);
      console.log(data._id);
      await dispatch(updateClient(data._id, data));
      await dispatch(getAllClients());
    } else {
      console.log("Saving new client data", data);
      await dispatch(createClient(data));
      await dispatch(getAllClients());
    }

  };

  const handleToggleShow = async (clientId, updateData) => {
    console.log("Toggling client item:", clientId, updateData);
    try {
      // Actualiza el estado "active" de la noticia en la página actual
      const updatedPageData = pageData.map((item) =>
        item._id === clientId ? { ...item, active: updateData.active } : item
      );
      setPageData(updatedPageData);
      console.log("Actualizando estado de active del cliente:", clientId);
      await dispatch(updateClient(clientId, { active: updateData.active }));
    } catch (error) {
      console.error("Error toggling news item:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Crear cliente
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Crear Cliente</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cliente"
                value={clientName} // Usa el estado clientName directamente
                onChange={handleClientNameChange} // Captura el cambio en clientName
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de inicio"
                type="date"
                value={joinDate} // Usa joinDate en lugar de editingClient.joinDate
                onChange={handleJoinDate}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={editingClient.active}
                    onChange={(e) =>
                      setEditingClient((prevData) => ({
                        ...prevData,
                        active: e.target.checked,
                      }))
                    }
                    name="active"
                    color="primary"
                  />
                }
                label="Activo"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <AddressForm
                  onSelectedData={handleAddressData}
                  addressData={direccion ?? {}}
                  clearForm={clearAddressForm}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputLabel>Logo</InputLabel>
                  <input type="file" onChange={handleAvatarChange} />
                </Grid>
                <Grid item xs={12}>
                  {avatarPreview && (
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={avatarPreview}
                        alt="Imagen de previsualización"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleSave(editingClient)} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
