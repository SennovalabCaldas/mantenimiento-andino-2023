import { useEffect, useState } from "react";
import {
  createService,
  deleteService,
  getServicesMiami,
} from "../../../actions/glampingActions";
import {
  Typography,
  Button,
  Modal,
  TextField,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const GlampingAdmin = ({makinaAndinaMiamiServices}) => {
 
  console.log("Makina Andina Miami", makinaAndinaMiamiServices);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState(false);
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

  const handleEdit = (service) => {
    setEditingService(service);
    setIsEditing(true);
    setEditedService({
      serviceName: service.serviceName,
      description: service.description,
      active: service.active,
      photos: service.photos.map((photo) => photo),
      imageUrls: service.photos.map((photo) => photo),
      createdAt: service.createdAt,
    });

    handleModalOpen();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleDelete = (serviceId) => {
    dispatch(deleteService(serviceId));
    dispatch(getServicesMiami());
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
      await dispatch(getServicesMiami());
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
    dispatch(getServicesMiami());
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
                src={editedService.imageUrls[0]}
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
                    src={imageUrl}
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
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Servicio</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {makinaAndinaMiamiServices.map((service) => (
              <TableRow key={service._id}>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(service)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
