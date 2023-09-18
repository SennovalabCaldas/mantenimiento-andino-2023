import { DialogContent } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const FoundationNews = () => {
  // const dispatch = useDispatch();

  // const [avatar, setAvatar] = useState(null);
  // const [supplierName, setSupplierName] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [editingSupplier, setEditingSupplier] = useState({});
  // const [newSupplier, setNewSupplier] = useState({
  //   supplierName: "",
  //   joinDate: "",
  //   active: true,
  //   address: {},
  // });

  // const handleCreate = () => {
  //   setOpenDialog(true);
  //   setEditingSupplier({});
  //   setNewSupplier({
  //     supplierName: "",
  //     joinDate: "",
  //     active: true,
  //     address: {},
  //   });
  // };

  // const handleClientNameChange = (e) => {
  //   setSupplierName(e.target.value);
  // };

  // const handleJoinDate = (e) => {
  //   setNewSupplier((prevData) => ({
  //     ...prevData,
  //     joinDate: e.target.value,
  //   }));
  // };

  // const handleAddressData = (data) => {
  //   setNewSupplier((prevData) => ({
  //     ...prevData,
  //     address: data,
  //   }));
  // }

  // const clearAddressForm = () => {
  //   setNewSupplier((prevData) => ({
  //     ...prevData,
  //     address: {},
  //   }));
  // }

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   setAvatar(file);
  //   setAvatarPreview(URL.createObjectURL(file));
  // }



  // const handleSave = async () => {
  //   const data = {
  //     ...newCategory,
  //     supplierName: supplierName,
  //     active: editingSupplier.active,
  //     avatar: avatar,
  //   };
  //     

  //   if (data._id) {
  //       
  //       
  //     await dispatch(updateSupplier(data._id, data));
  //   } else {
  //       
  //     await dispatch(createSupplier(data));
  //   }
  //   await dispatch(getAllFoundations());
  // };
  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={handleCreate}>
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
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};
