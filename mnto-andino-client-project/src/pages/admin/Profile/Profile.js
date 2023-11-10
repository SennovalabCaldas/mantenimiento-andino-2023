import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Typography,
  Switch,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  updateProfile,
} from "../../../actions/profileActions";
import { Divider } from "semantic-ui-react";

export const Profile = () => {
  const dispatch = useDispatch();
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState({
    open: false,
    profileId: null,
  });
  const profiles = useSelector((state) => state.profile.allProfiles) || [];
  const [newProfile, setNewProfile] = useState({
    profileName: "",
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
    contact_telephone: "",
    email: "",
    contact_whatsApp: "",
    active: false,
  });

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  const handleCreateProfile = async () => {
    try {
      await dispatch(createProfile(newProfile));
      dispatch(getAllProfiles());
      setNewProfile({
        profileName: "",
        feature1: "",
        feature2: "",
        feature3: "",
        feature4: "",
        contact_telephone: "",
        email: "",
        contact_whatsApp: "",
        active: false,
      });
    } catch (error) {
      console.error("Error al crear el perfil:", error);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    setConfirmDeleteDialog({ open: true, profileId });
  };

  const handleToggleActive = async (profileId, active) => {
    try {
      await dispatch(updateProfile(profileId, { active }));
      dispatch(getAllProfiles());
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleEditProfile = async (profileId, active) => {
    try {
      await dispatch(updateProfile(profileId, { active }));
      dispatch(getAllProfiles());
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProfile(confirmDeleteDialog.profileId));
      dispatch(getAllProfiles());
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    } finally {
      setConfirmDeleteDialog({ open: false, profileId: null });
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteDialog({ open: false, profileId: null });
  };

  return (
    <div>
      <Card style={{ maxWidth: 400, margin: "auto", marginTop: 20 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Crear Perfil
          </Typography>
          <form>
            <Grid container spacing={2}>
              {Object.keys(newProfile).map((key) => (
                <Grid item xs={12} key={key}>
                  <TextField
                    fullWidth
                    label={key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    value={newProfile[key]}
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, [key]: e.target.value })
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Switch
                  checked={newProfile.active}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, active: e.target.checked })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography variant="body2">Activo</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleCreateProfile}
            >
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>

      <div style={{ marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Lista de Perfiles
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {profiles.map((profile) => (
            <Card key={profile.id} style={{ margin: 10 }}>
              <CardContent>
                <Typography variant="h6">{profile.profileName}</Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>
                  {profile.feature1}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {profile.feature2}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {profile.feature3}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {profile.feature4}
                </Typography>
                <Divider />

                <Typography variant="body1" gutterBottom>
                  {profile.contact_telephone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {profile.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {profile.contact_whatsApp}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {profile.active}
                </Typography>
              </CardContent>

              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Switch
                  checked={profile.active}
                  onChange={() => {
                    handleToggleActive(profile._id, profile.active);
                    handleEditProfile(profile._id, !profile.active);
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "toggle-profile-active" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: 10 }}
                  onClick={() => handleDeleteProfile(profile._id)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={confirmDeleteDialog.open} onClose={cancelDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este perfil?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
