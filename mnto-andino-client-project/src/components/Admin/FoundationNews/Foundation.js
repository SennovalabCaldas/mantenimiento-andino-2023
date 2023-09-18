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
import {
  createFoundation,
  getAllFoundations,
  updateFoundation,
} from "../../../actions/foundationActions";

export const Foundation = () => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(true);
  const [foundationName, setfFoundationName] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFoundation, setEditingFoundation] = useState({});
  const [newFoundation, setNewFoundation] = useState({
    foundationName: "",
    active: true,
    avatar: [],
  });

  const handleCreate = () => {
    setOpenDialog(true);
    setEditingFoundation({});
    setNewFoundation({
      foundationName: "",
      active: true,
      avatar: [],
    });
  };

  const handleFoundationNameChange = (e) => {
    setfFoundationName(e.target.value);
  };

  const handleJoinDate = (e) => {
    setNewFoundation((prevData) => ({
      ...prevData,
      joinDate: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const data = {
      ...newFoundation,
      foundationName: foundationName,
      active: editingFoundation.active,
      avatar: avatar,
    };

    if (data._id) {
      await dispatch(updateFoundation(data._id, data));
      // await dispatch(getAllFoundations());
    } else {
      await dispatch(createFoundation(data));
      // await dispatch(getAllFoundations());
    }
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Crear fundación
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Crear fundación</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fundación"
                value={foundationName} // Usa el estado clientName directamente
                onChange={handleFoundationNameChange} // Captura el cambio en clientName
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
                    checked={editingFoundation.active}
                    onChange={(e) =>
                      setEditingFoundation((prevData) => ({
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
      </Dialog>
    </>
  );
};
