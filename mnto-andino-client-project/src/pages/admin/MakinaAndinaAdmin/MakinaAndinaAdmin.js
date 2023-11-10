import React, { useEffect, useState } from "react";

import {
  createService,
  deleteService,
  getServices,
} from "../../../actions/makinaAndinaActions";
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
import "./MakinaAndinaAdmin.scss";
import { image } from "../../../assets";

export const MakinaAndinaAdmin = () => {
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();
  const makinaAndinaServices = useSelector(
    (state) => state.makinaAndina.makinaAndinaServices
  );
  console.log("makinaAndinaServices", makinaAndinaServices);
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
    dispatch(getServices());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPhotos([...photos, ...selectedFiles]);
  };

  const handleSave = async () => {
    console.log("serviceName:", serviceName);
    console.log("description:", description);
    console.log("createdAt:", createdAt);
    const makinaAndinaServiceData = {
      serviceName,
      description,
      createdAt,
      photos,
    };
    await dispatch(createService(makinaAndinaServiceData));
    await dispatch(getServices());
  };

  const handleDeleteFoundation = async (foundationId) => {
    console.log("foundationId", foundationId);
    await dispatch(deleteService(foundationId));
    await dispatch(getServices());
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmationDialogOpen(false);
    handleDeleteFoundation(selectedMakinAndinaService._id);
  };

  return (
    <div className="makina-andina-list-container">
      <div className="fundations-list-form">
        <Card className="card-create-certification">
          <CardContent className="certification-form-content">
            <div className="titulo-servicios-makina-andina">
              <div className="logo-container">
                <img src={image.logo4} alt="Makina Andina Miami" />
              </div>
              <Typography variant="h5" component="h3">
                <strong>SERVICIOS</strong>
              </Typography>
            </div>

            <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              Crear Cliente
            </Typography>
            <form encType="multipart/form-data">
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <TextField
                  label="Nombre"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                /> */}
                <TextField
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  placeholder="Nombre del servicio"
                  size="small"
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
          </CardContent>
        </Card>
      </div>

      <div className="fundations-list">
        <h2>SERVICIOS</h2>
        <Grid container spacing={2}>
          {makinaAndinaServices.length > 0 ? (
            makinaAndinaServices.map((makinaAndinaService) => (
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
                    <div className="card-actions">
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
                    </div>
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
        <DialogTitle style={{ textAlign: "center", color: "#000" }}>
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
