import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { ENV } from "../../../utils";
import { MakinaAndinaServiceModal } from "./MakinaAndinaServiceModal";
import {
  createServiceMakinaMiami,
  deleteServiceMakinaMiami,
  getServicesMakinaMiami,
} from "../../../actions/makinaAndinaMiamiActions";
import "./MakinaAndinaMiamiAdmin.scss";
import { image } from "../../../assets";

export const MakinaAndinaMiamiAdmin = () => {
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();
  const makinaAndinaMiamiServices = useSelector(
    (state) => state.makinaAndinaMiami.makinaAndinaMiamiServices
  );
  console.log("makinaAndinaMiamiServices", makinaAndinaMiamiServices);
  const baseApi = ENV.BASE_PATH;
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [selectedMakinAndinaService, setSelectedMakinAndinaService] =
    useState(null);

  useEffect(() => {
    dispatch(getServicesMakinaMiami());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPhotos([...photos, ...selectedFiles]);
  };

  const handleSave = async () => {
    console.log("serviceName:", serviceName);
    console.log("description:", description);
    console.log("createdAt:", createdAt);
    const makinaAndinaMiamiServiceData = {
      serviceName,
      description,
      createdAt,
      photos,
    };
    await dispatch(createServiceMakinaMiami(makinaAndinaMiamiServiceData));
    await dispatch(getServicesMakinaMiami());
  };

  const handleDeleteFoundation = async (foundationId) => {
    console.log("foundationId", foundationId);
    await dispatch(deleteServiceMakinaMiami(foundationId));
    await dispatch(getServicesMakinaMiami());
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmationDialogOpen(false);
    handleDeleteFoundation(selectedMakinAndinaService._id);
  };

  return (
    <div className="makina-andina-list-container">
      <div className="fundations-list-form">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: "10px" }}>
            <img src={image.logo3} alt="Makina Andina Miami" />
          </div>
        </div>
        <Card className="card-create-certification">
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Ingresar servicio de Makina Andina Miami
            </Typography>
            <form encType="multipart/form-data">
              <div className="certification-form-fields">
                <TextField
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  placeholder="Nombre del servicio"
                  size="small"
                  style={{ marginRight: "10px" }}
                  required
                  value={serviceName}
                  onChange={(event) => setServiceName(event.target.value)}
                />
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción"
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />

                <div>
                  <label htmlFor="createdAt">Fecha de creación</label>
                  <TextField
                    type="date"
                    id="createdAt"
                    name="createdAt"
                    size="small"
                    style={{
                      marginLeft: "10px",
                    }}
                    placeholder="Fecha de creación"
                    required
                    value={createdAt}
                    onChange={(event) => setCreatedAt(event.target.value)}
                  />
                </div>

                <TextField
                  type="file"
                  accept="image/*"
                  multiple
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ marginTop: "10px" }}
                  >
                    Elegir foto
                  </Button>
                </label>
                {photos.length > 0 && (
                  <div className="certification-photos-preview">
                    {photos.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Foto ${index}`}
                        className="certification-image"
                      />
                    ))}
                  </div>
                )}
                <div>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "5px" }}
                  >
                    Crear
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="fundations-list">
        <h2>SERVICIOS</h2>
        <Grid container spacing={2}>
          {makinaAndinaMiamiServices.length > 0 ? (
            makinaAndinaMiamiServices.map((makinaAndinaService) => (
              <Grid item xs={12} sm={6} md={4} key={makinaAndinaService._id}>
                <Card className="card-certification">
                  <CardMedia
                    component="img"
                    alt={`Certificación ${makinaAndinaService._id}`}
                    height="140"
                    image={
                      makinaAndinaService.photos.length > 0
                        ? `${makinaAndinaService.photos[0]}`
                        : ""
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {makinaAndinaService.serviceName}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {makinaAndinaService.createdAt}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Cantidad de fotos: {makinaAndinaService.photos.length}
                    </Typography>
                    <IconButton
                      aria-label="Eliminar"
                      onClick={() => {
                        setSelectedMakinAndinaService(makinaAndinaService);
                        setDeleteConfirmationDialogOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Buscar"
                      onClick={() => {
                        setSelectedMakinAndinaService(makinaAndinaService);
                        setModalOpen(true);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Container maxWidth="md">
              <Skeleton variant="rectangular" height={200} />
            </Container>
          )}
        </Grid>
        {selectedMakinAndinaService && (
          <MakinaAndinaServiceModal
            open={modalOpen}
            onClose={() => {
              setSelectedMakinAndinaService(null);
              setModalOpen(false);
            }}
            foundationData={selectedMakinAndinaService}
          />
        )}
      </div>
      <Dialog
        open={deleteConfirmationDialogOpen}
        onClose={() => setDeleteConfirmationDialogOpen(false)}
      >
        <DialogTitle style={{ textAlign: "center", color: "rgb(0 0 0)" }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este servicio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationDialogOpen(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
