import { useEffect, useState } from "react";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../../../../actions/makinaAndinaActions";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  Alert,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { ENV } from "../../../../utils";

export const Services = () => {
  const makinaAndinaServices = useSelector(
    (state) => state.makinaAndina.makinaAndinaServices
  );
  console.log(makinaAndinaServices);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const baseApi = ENV.BASE_PATH;
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState({
    serviceName: "",
    description: "",
    photos: [],
    imageUrls: [],
    active: true,
    createdAt: new Date().toISOString(),
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleDelete = (serviceId) => {
    dispatch(deleteService(serviceId));
    dispatch(getServices());
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingService(null);
    setIsEditing(false);
    setEditedService({
      serviceName: "",
      description: "",
      active: true,
      photos: [],
      imageUrls: [],
      createdAt: new Date().toISOString(),
    });
  };

  const onFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const urls = selectedFiles
      .map((file) => URL.createObjectURL(file))
      .filter((url) => url);

    setEditedService((prevService) => ({
      ...prevService,
      photos: selectedFiles, // Reemplaza las imágenes anteriores con las nuevas seleccionadas
      imageUrls: urls, // Reemplaza las URL anteriores con las nuevas URL de imágenes
    }));
  };

  /* ------------------------------------------------------ */

  const handleCreateService = async () => {
    setIsCreatingService(true);
    try {
      // Envía solo las imágenes en el campo 'photos' de 'editedService'
      await dispatch(
        createService({
          serviceName: editedService.serviceName,
          description: editedService.description,
          active: editedService.active,
          photos: editedService.photos,
          createdAt: editedService.createdAt,
        })
      );
      await dispatch(getServices());
      setEditedService({
        serviceName: "",
        description: "",
        active: true,
        photos: [],
        imageUrls: [],
        createdAt: new Date().toISOString(),
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleModalOpen}
        startIcon={<AddCircleIcon />}
      >
        Crear Servicio
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {makinaAndinaServices.map((service) => (
          <Card
            key={service.id}
            style={{
              margin: "10px",
              minWidth: "280px",
              maxWidth: "280px",
            }}
          >
            <CardContent>
              <div
                className="image"
                style={{
                  margin: "10px",
                  minHeight: "280px",
                  maxHeight: "280px",
                  display: "flex",
                  objectFit: "cover",
                  alignItems: "center",
                  borderRadius: "4px",
                  background: " rgba(0,0,0,0.01)",
                }}
              >
                {service.photos && service.photos.length > 0 && (
                  <img
                    src={`${baseApi}/${service.photos[0]}`} // Use the stored URL directly
                    alt={`Foto principal`}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </div>
              <Typography variant="h6">{service.serviceName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {service.description}
              </Typography>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {service.photos &&
                  service.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`${baseApi}/${photo}`} // Use the stored URL directly
                      alt={`Foto ${index}`}
                      style={{ width: "40px", height: "40px", margin: "2px" }}
                    />
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <IconButton onClick={() => handleDelete(service._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <form className="user-form">
        <Modal open={modalOpen} onClose={handleModalClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
            }}
          >
            {uploadError && (
              <Alert severity="error" style={{ marginBottom: "10px" }}>
                Debes seleccionar al menos una foto.
              </Alert>
            )}
            <IconButton
              onClick={handleModalClose}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">
              {isEditing ? "Editar Servicio" : "Crear Nuevo Servicio"}
            </Typography>

            <TextField
              label="Nombre del Servicio"
              fullWidth
              margin="normal"
              value={editedService.serviceName}
              onChange={(e) =>
                setEditedService({
                  ...editedService,
                  serviceName: e.target.value,
                })
              }
            />
            <TextField
              label="Descripción"
              fullWidth
              margin="normal"
              value={editedService.description}
              onChange={(e) =>
                setEditedService({
                  ...editedService,
                  description: e.target.value,
                })
              }
            />
            <input
              type="file"
              accept="image/*"
              multiple
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => onFileChange(e, editedService)}
            />

            <label htmlFor="file-input">
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{ marginTop: "10px" }}
              >
                Elegir archivos
              </Button>
            </label>

            {editedService.imageUrls && editedService.imageUrls.length > 0 && (
              <img
                src={`${baseApi}/${editedService.imageUrls[0]}`}
                alt={`Foto principal`}
                style={{
                  width: "200px",
                  height: "200px",
                  marginBottom: "10px",
                }}
              />
            )}

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {editedService.imageUrls &&
                editedService.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={`${baseApi}/${imageUrl}`}
                    alt={`Foto ${index}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "5px",
                    }}
                  />
                ))}
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateService}
              style={{ marginTop: "10px" }}
            >
              {isEditing ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </Modal>
      </form>
    </div>
  );
};
