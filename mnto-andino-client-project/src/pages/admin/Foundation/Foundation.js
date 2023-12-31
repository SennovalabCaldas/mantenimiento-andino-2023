// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Container,
//   Skeleton,
//   Card,
//   CardContent,
//   IconButton,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import {
//   createFoundationNews,
//   deleteFoundationNews,
//   getAllFoundationsNews,
// } from "../../../actions/foundationNewsActions";
// import { useSelector } from "react-redux";
// import {
//   DeleteOutline as DeleteIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// import { ENV } from "../../../utils";
// import FoundationModal from "./FoundationModal";
// import "./Foundation.scss";

// export const Foundation = () => {
//   const foundations = useSelector((state) => state.foundation.allFoundations);
//   const dispatch = useDispatch();
//   const [selectedFoundation, setSelectedFoundation] = useState(null);
//   const baseApi = ENV.BASE_PATH;
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [foundationToDelete, setFoundationToDelete] = useState(null);

//   const handleDeleteFoundation = (foundationId) => {
//     setFoundationToDelete(foundationId);
//     setDeleteConfirmationOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await dispatch(deleteFoundationNews(foundationToDelete));
//       await dispatch(getAllFoundationsNews());
//     } catch (error) {
//       console.error("Error al eliminar la fundación:", error);
//     } finally {
//       setFoundationToDelete(null);
//       setDeleteConfirmationOpen(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setFoundationToDelete(null);
//     setDeleteConfirmationOpen(false);
//   };

//   useEffect(() => {
//     dispatch(getAllFoundationsNews());
//   }, [dispatch]);

//   const [images, setImages] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setImages([]);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setImages(selectedFiles);
//   };

//   const handleSave = async () => {
//     const saveCertification = async (data) => {
//       try {
//         await dispatch(createFoundationNews(data));
//         await dispatch(getAllFoundationsNews());
//       } catch (error) {
//         console.error("Error al guardar la certificación:", error);
//       } finally {
//         handleModalClose();
//       }
//     };

//     if (images.length > 0) {
//       let data = {
//         images: Array.isArray(images) ? images : [images],
//       };

//       saveCertification(data);
//     } else {
//       console.log("Error al guardar la certificación");
//     }
//   };

//   return (
//     <div className="foundation-list-container">
//       <div className="foundation-list-form">
//         <h2>Publicación de fotos</h2>
//         <Card className="card-create-certification">
//           <CardContent>
//             <Typography variant="h5" component="h3">
//               Subir nuevas fotos
//             </Typography>
//             <form encType="multipart/form-data">
//               <div className="certification-form-fields">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   id="file-input"
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                 />
//                 <label htmlFor="file-input">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     component="span"
//                     style={{ marginTop: "10px" }}
//                   >
//                     Elegir archivos
//                   </Button>
//                 </label>
//                 {images.length > 0 && (
//                   <div className="certification-images-preview">
//                     {images.map((file, index) => (
//                       <img
//                         key={index}
//                         src={URL.createObjectURL(file)}
//                         alt={`Foto ${index}`}
//                         className="certification-image"
//                       />
//                     ))}
//                   </div>
//                 )}
//                 <div>
//                   <Button
//                     onClick={handleSave}
//                     variant="contained"
//                     color="primary"
//                     style={{ marginTop: "5px" }}
//                   >
//                     Crear
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="foundation-list">
//         <h2>CERTIFICACIONES</h2>
//         <Grid container spacing={2}>
//           {foundations.length > 0 ? (
//             foundations.map((foundation) => (
//               <Grid item xs={12} sm={6} md={4} key={foundation._id}>
//                 <Card className="card-certification">
//                   <CardMedia
//                     component="img"
//                     alt={`Certificación ${foundation._id}`}
//                     height="140"
//                     image={
//                       foundation.images.length > 0
//                         ? `${baseApi}/${foundation.images[0]}`
//                         : ""
//                     }
//                   />
//                   <CardContent>
//                     <Typography variant="body2" component="p">
//                       {foundation.createdAt}
//                     </Typography>
//                     <Typography variant="body2" component="p">
//                       Cantidad de fotos: {foundation.images.length}
//                     </Typography>
//                     <div className="card-actions">
//                       <IconButton
//                         aria-label="Eliminar"
//                         onClick={() => handleDeleteFoundation(foundation._id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                       <IconButton
//                         aria-label="Buscar"
//                         onClick={() => {
//                           setSelectedFoundation(foundation);
//                           setModalOpen(true);
//                         }}
//                       >
//                         <SearchIcon />
//                       </IconButton>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Container maxWidth="md">
//               <Skeleton variant="rectangular" height={200} />
//             </Container>
//           )}
//         </Grid>
//         {selectedFoundation && (
//           <FoundationModal
//             open={modalOpen}
//             onClose={() => {
//               setSelectedFoundation(null);
//               setModalOpen(false);
//             }}
//             foundationData={selectedFoundation}
//           />
//         )}
//         <Dialog
//           open={deleteConfirmationOpen}
//           onClose={handleCancelDelete}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             Confirmar eliminación
//           </DialogTitle>
//           <DialogContent>
//             ¿Estás seguro de que deseas eliminar esta fundación?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete} color="primary">
//               Cancelar
//             </Button>
//             <Button onClick={handleConfirmDelete} color="primary" autoFocus>
//               Confirmar
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </div>
//   );
// };
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [foundationToDelete, setFoundationToDelete] = useState(null);




  const handleDeleteFoundation = (foundationId) => {
    setFoundationToDelete(foundationId);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteFoundationNews(foundationToDelete));
      await dispatch(getAllFoundationsNews());
    } catch (error) {
      console.error("Error al eliminar la fundación:", error);
    } finally {
      setFoundationToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setFoundationToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    dispatch(getAllFoundationsNews());
  }, [dispatch]);

  const [mediaFiles, setMediaFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    setMediaFiles([]);
  };
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setMediaFiles(selectedFiles);
  };
  const handleSave = async () => {
    const saveFoundation = async (data) => {
      try {
        await dispatch(createFoundationNews(data));
        await dispatch(getAllFoundationsNews());
      } catch (error) {
        console.error("Error al guardar la fundación:", error);
      } finally {
        handleModalClose();
      }
    };

    if (mediaFiles.length > 0) {
      let data = {
        media: mediaFiles.map((file) => ({
          type: file.type.startsWith("image/") ? "image" : "video",
          file,
        })),
      };

      saveFoundation(data);
    } else {
      console.log("Error al guardar la fundación");
    }
  };
  const formattedFoundationData = selectedFoundation
  ? {
      _id: selectedFoundation._id,
      createdAt: selectedFoundation.createdAt,
      media: selectedFoundation.images.map((image) => ({
        type: "image",
        file: {
          filename: image,
        },
      })),
      videos: selectedFoundation.videos.map((video) => ({
        type: "video",
        file: {
          filename: video,
        },
      })),
    }
  : null;

console.log("formattedFoundationData", formattedFoundationData);

  return (
    <div className="foundation-list-container">
      <div className="foundation-list-form">
        <h2>Publicación de fotos y videos</h2>
        <Card className="card-create-foundation">
          <CardContent>
            <Typography variant="h5" component="h3">
              Subir nuevas fotos o videos
            </Typography>
            <form encType="multipart/form-data">
              <div className="foundation-form-fields">
                <input
                  type="file"
                  accept="image/*, video/*"
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
                {mediaFiles.length > 0 && (
                  <div className="foundation-media-preview">
                    {mediaFiles.map((file, index) => (
                      <div key={index}>
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Foto ${index}`}
                            className="foundation-media"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(file)}
                            alt={`Video ${index}`}
                            className="foundation-media"
                            controls
                          />
                        )}
                      </div>
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

      <div className="foundation-list">
        <h2>Lista de publicaciones</h2>
        <Grid container spacing={2}>
          {foundations.length > 0 ? (
            foundations.map((foundation) => (
              <Grid item xs={12} sm={6} md={4} key={foundation._id}>
                <Card className="card-foundation">
                  {foundation.videos.length > 0 ? (
                    <CardMedia
                      component="video"
                      alt={`Fundación ${foundation._id}`}
                      height="140"
                      controls
                    >
                      <source
                        src={`${baseApi}/${foundation.videos[0]}`}
                        type="video/mp4"
                      />
                      Tu navegador no soporta el tag de video.
                    </CardMedia>
                  ) : (
                    <CardMedia
                      component="img"
                      alt={`Fundación ${foundation._id}`}
                      height="140"
                      image={
                        foundation.images.length > 0
                          ? `${baseApi}/${foundation.images[0]}`
                          : "ruta_de_la_imagen_por_defecto"
                      }
                    />
                  )}
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {foundation.createdAt}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Cantidad de archivos:{" "}
                      {foundation.images.length + foundation.videos.length}
                    </Typography>
                    <div className="card-actions">
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
        {selectedFoundation && (
          <FoundationModal
            open={modalOpen}
            onClose={() => {
              setSelectedFoundation(null);
              setModalOpen(false);
            }}
            foundationData={formattedFoundationData}  
          />
        )}
        <Dialog
          open={deleteConfirmationOpen}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirmar eliminación
          </DialogTitle>
          <DialogContent>
            ¿Estás seguro de que deseas eliminar esta fundación?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
