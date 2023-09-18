import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { initialValues, validationSchema } from "./ServicioList.form";
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
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../../../../actions/serviceActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ServiceList = () => {
  const services = useSelector((state) => state.service.services);
    
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState({
    name: "",
    description: "",

    photos: [],
    imageUrls: [],
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleDelete = (serviceId) => {
      
    dispatch(deleteService(serviceId));
    dispatch(getServices());
  };

  const handleEdit = (service) => {
      
    setEditingService(service);
    setIsEditing(true);
    setEditedService({
      name: service.name,
      description: service.description,
      photos: service.photos.map((photo) => photo),
      imageUrls: service.photos.map((photo) => photo),
    });
      
    handleModalOpen();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingService(null);
    setIsEditing(false);
    setEditedService({
      name: "",
      description: "",
      photos: [],
      imageUrls: [],
    });
  };

  // const onFileChange = (event, formik) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   const urls = selectedFiles
  //     .map((file) => URL.createObjectURL(file))
  //     .filter((url) => url);

  //   if (urls.length > 0) {
  //     setEditedService((prevService) => ({
  //       ...prevService,
  //       photos: [...prevService.photos, ...selectedFiles],
  //       imageUrls: [...prevService.imageUrls, ...urls],
  //     }));
  //       

  //     formik.setFieldValue("photos", [...formik.values.photos, ...urls]);
  //   }
  // };

  const onFileChange = (event, formik) => {
    const selectedFiles = Array.from(event.target.files);
    const urls = selectedFiles
      .map((file) => URL.createObjectURL(file))
      .filter((url) => url);

    setEditedService((prevService) => ({
      ...prevService,
      photos: [...prevService.photos, ...selectedFiles],
      imageUrls: [...prevService.imageUrls, ...urls],
    }));

    formik.setFieldValue("photos", [...formik.values.photos, ...selectedFiles]);
  };

  /* ------------------------------------------------------ */

  const handleCreateService = async () => {
    setIsCreatingService(true);
    try {
      // Envía solo las imágenes en el campo 'photos' de 'editedService'
      await dispatch(
        createService({
          name: editedService.name,
          description: editedService.description,
          photos: editedService.photos, // Incluye las imágenes aquí
        })
      );
      await dispatch(getServices());
      setEditedService({
        name: "",
        description: "",
        photos: [], // Limpia el campo 'photos'
        imageUrls: [], // No es necesario limpiar 'imageUrls'
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const handleUpdateService = async () => {
    setIsCreatingService(true);
    try {
        
      const updatedService = {
        ...editingService,
        photos: editedService.photos,
      };
        
      await dispatch(updateService(editingService._id, updatedService));
      await dispatch(getServices());
      setIsEditing(false);
      handleModalClose();
    } catch (error) {
      console.error("Error updating service:", error);
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
        {services.map((service) => (
          <Card key={service.id} style={{ margin: "10px", minWidth: "200px" }}>
            <CardContent>
              {service.photos && service.photos.length > 0 && (
                <img
                  src={service.photos[0]} // Use the stored URL directly
                  alt={`Foto principal`}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <Typography variant="h6">{service.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {service.description}
              </Typography>
              {/* Display other service details */}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {service.photos &&
                  service.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo} // Use the stored URL directly
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
                <IconButton onClick={() => handleEdit(service)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(service._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Formik
        initialValues={initialValues(editedService)}
        validationSchema={validationSchema()}
        onSubmit={isEditing ? handleUpdateService : handleCreateService}
      >
        {(formik) => (
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
                  width: "400px", // Ajusta el ancho de la ventana modal según tu preferencia
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
                  value={editedService.name}
                  onChange={(e) =>
                    setEditedService({ ...editedService, name: e.target.value })
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
                  onChange={(event) => onFileChange(event, formik)}
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

                {editedService.imageUrls &&
                  editedService.imageUrls.length > 0 && (
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
                  onClick={
                    isEditing ? handleUpdateService : handleCreateService
                  }
                  style={{ marginTop: "10px" }}
                >
                  {isEditing ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </Modal>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceList;
