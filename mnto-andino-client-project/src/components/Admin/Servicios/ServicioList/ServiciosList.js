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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ENV } from "../../../../utils";

const ServiceList = () => {
  const baseApi = ENV.BASE_PATH;
  const services = useSelector((state) => state.service.services);
  const categories = useSelector(
    (state) => state.categoryService.allCategoriesService
  );
  const categoriesServiceActive = categories.filter(
    (category) => category.active === true
  );
  console.log(categoriesServiceActive);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState({
    name: "",
    description: "",
    categoryService: "",
    photos: [],
    imageUrls: [],
  });

  const [isImageEditing, setIsImageEditing] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [categoryService, setCategoryService] = useState(null);

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
      categoryService: service.categoryService,
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
      categoryService: "",
      photos: [],
      imageUrls: [],
    });
  };

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
      await dispatch(
        createService({
          name: editedService.name,
          description: editedService.description,
          categoryService: selectedCategoryName, // Envia el nombre de la categoría seleccionada
          photos: editedService.photos,
        })
      );
      await dispatch(getServices());
      setEditedService({
        name: "",
        description: "",
        categoryService: "",
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
        categoryService: {
          id: selectedCategoryId, // Envia el ID de la categoría seleccionada
          name: selectedCategoryName, // Envia el nombre de la categoría seleccionada
        },
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

                <FormControl fullWidth margin="normal">
                  <InputLabel id="service-label">
                    Selecciona un servicio
                  </InputLabel>
                  <Select
                    labelId="service-label"
                    id="service-select"
                    value={selectedCategoryId}
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      const categoryName = categoriesServiceActive.find(
                        (category) => category._id === categoryId
                      ).nameCategoryService;

                      setSelectedCategoryId(categoryId); // Actualiza el ID de la categoría seleccionada
                      setSelectedCategoryName(categoryName); // Actualiza el nombre de la categoría seleccionada
                    }}
                  >
                    {categoriesServiceActive.map((categoryService) => (
                      <MenuItem
                        key={categoryService._id}
                        value={categoryService._id}
                      >
                        {categoryService.nameCategoryService}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
