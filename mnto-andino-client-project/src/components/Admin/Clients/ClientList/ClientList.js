import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClient,
  getAllClients,
  updateClient,
} from "../../../../actions/clientActions";
import { ENV } from "../../../../utils";

export const ClientList = () => {
  const baseApi = ENV.BASE_API;
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [clientToDeleteId, setClientToDeleteId] = useState(null);

  const handleDelete = async (id) => {
    // Abre la ventana modal de confirmación
    setClientToDeleteId(id);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    // Cierra la ventana modal de confirmación
    setConfirmationDialogOpen(false);
    try {
      await dispatch(deleteClient(clientToDeleteId));
      await dispatch(getAllClients());
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleToggleActive = async (clientId, isActive) => {
    try {
      await dispatch(updateClient(clientId, { active: isActive }));
      if (
        isActive ||
        window.confirm("¿Estás seguro de que deseas desactivar este cliente?")
      ) {
        await dispatch(getAllClients());
      }
    } catch (error) {
      console.error("Error al actualizar el estado del cliente:", error);
    }
  };

  const handleToggleNational = async (clientId, isNational) => {
    try {
      await dispatch(updateClient(clientId, { national: isNational }));
      if (
        isNational ||
        window.confirm(
          "¿Estás seguro de que deseas cambiar la ubicación del cliente?"
        )
      ) {
        await dispatch(getAllClients());
      }
    } catch (error) {
      console.error("Error al actualizar la ubicación del cliente:", error);
    }
  };

  const handleEdit = async (clientId, isActive) => {
    try {
      await dispatch(updateClient(clientId, { active: isActive }));
      if (
        isActive ||
        window.confirm("¿Estás seguro de que deseas editar este cliente?")
      ) {
        await dispatch(getAllClients());
      }
    } catch (error) {
      console.error("Error al editar el cliente:", error);
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Nacional</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients && clients.length > 0 ? (
              clients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.clientName}</TableCell>

                  <TableCell>
                    {client.avatar && (
                      <img
                        src={`${baseApi}/${client.avatar}`}
                        alt="Imagen de previsualización"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={client.active}
                      onChange={() =>
                        handleToggleActive(client._id, !client.active)
                      }
                      color="primary"
                      inputProps={{ "aria-label": "Cliente activo" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={client.national}
                      onChange={() =>
                        handleToggleNational(client._id, !client.national)
                      }
                      color="secondary"
                      inputProps={{ "aria-label": "Cliente nacional" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(client._id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No hay clientes</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ventana modal de confirmación */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
