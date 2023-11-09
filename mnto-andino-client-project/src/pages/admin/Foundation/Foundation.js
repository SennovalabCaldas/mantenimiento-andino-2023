import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Skeleton,
  Card,
  CardContent,
  IconButton,
  CardMedia,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createFoundationNews,
  deleteFoundationNews,
  getAllFoundationsNews,
} from "../../../actions/foundationNewsActions";
import { useSelector } from "react-redux";
import {
  DeleteOutline as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import { ENV } from "../../../utils";
import FoundationModal from "./FoundationModal";
import "./Foundation.scss";

export const Foundation = () => {
  const foundations = useSelector((state) => state.foundation.allFoundations);
  const dispatch = useDispatch();
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const baseApi = ENV.BASE_PATH;

  useEffect(() => {
    dispatch(getAllFoundationsNews());
  }, [dispatch]);

  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);



  const handleModalClose = () => {
    setModalOpen(false);
    setImages([]);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);
  };

  const handleSave = async () => {
    const saveCertification = async (data) => {
      try {
        await dispatch(createFoundationNews(data));
        await dispatch(getAllFoundationsNews());
      } catch (error) {
        console.error("Error al guardar la certificación:", error);
      } finally {
        handleModalClose();
      }
    };

    if (images.length > 0) {
      let data = {
        images: Array.isArray(images) ? images : [images],
      };

      saveCertification(data);
    } else {
      console.log("Error al guardar la certificación");
    }
  };

  const handleDeleteFoundation = async (foundationId) => {
    try {
      await dispatch(deleteFoundationNews(foundationId));
      await dispatch(getAllFoundationsNews());
    } catch (error) {
      console.error("Error al eliminar la fundación:", error);
    }
  };
  return (
    <div className="fundations-list-container">
      <div className="fundations-list-form">
        <h2>Crear certificación</h2>
        <Card className="card-create-certification">
          <CardContent>
            <Typography variant="h5" component="h3">
              Ingresar una nueva certificación
            </Typography>
            <form encType="multipart/form-data">
              <div className="certification-form-fields">
                <input
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
                    Elegir archivos
                  </Button>
                </label>
                {images.length > 0 && (
                  <div className="certification-images-preview">
                    {images.map((file, index) => (
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
        <h2>CERTIFICACIONES</h2>
        <Grid container spacing={2}>
          {foundations.length > 0 ? (
            foundations.map((foundation) => (
              <Grid item xs={12} sm={6} md={4} key={foundation._id}>
                <Card className="card-certification">
                  <CardMedia
                    component="img"
                    alt={`Certificación ${foundation._id}`}
                    height="140"
                    image={
                      foundation.images.length > 0
                        ? `${baseApi}/${foundation.images[0]}`
                        : ""
                    }
                  />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {foundation.createdAt}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Cantidad de fotos: {foundation.images.length}
                    </Typography>
                    <IconButton
                      aria-label="Eliminar"
                      onClick={() => handleDeleteFoundation(foundation._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Buscar"
                      onClick={() => {
                        setSelectedFoundation(foundation);
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
        {selectedFoundation && (
        <FoundationModal
          open={modalOpen}
          onClose={() => {
            setSelectedFoundation(null);
            setModalOpen(false);
          }}
          foundationData={selectedFoundation}
        />
      )}
      </div>
     
    </div>
  );
};
