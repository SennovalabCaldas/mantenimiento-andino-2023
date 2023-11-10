import React, { useState } from "react";
import { ENV } from "../../../utils";
import { useDispatch } from "react-redux";
import {
  deleteCertification,
  getAllCertifications,
} from "../../../actions/certificationActions";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "./CertificationsNal.scss";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const CertificationsNal = ({ certifications }) => {
  const dispatch = useDispatch();
  const baseApi = ENV.BASE_PATH;
  const certificationsPerPage = 5;
  const totalPages = Math.ceil(certifications.length / certificationsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState(null);

  const handleDeleteCertification = async (certificationId) => {
    console.log("Eliminar certificación:", certificationId);
    setCertificationToDelete(certificationId);
    setDeleteConfirmationOpen(true);
    // Resto de tu código
  };

  
  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteCertification(certificationToDelete));
      await dispatch(getAllCertifications());
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setCertificationToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handlePreviewImage = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      setPreviewImage(photos[0]); // Muestra la primera foto si hay varias
    } else if (typeof photos === "string") {
      setPreviewImage(photos); // Muestra la única foto si hay solo una
    }
  };

  const indexOfLastCertification = currentPage * certificationsPerPage;
  const indexOfFirstCertification =
    indexOfLastCertification - certificationsPerPage;
  const currentCertifications = certifications.slice(
    indexOfFirstCertification,
    indexOfLastCertification
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="certification-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Fotos</th>
            <th>Fecha de inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentCertifications.map((certification) => (
            <tr key={certification.id}>
              <td>{certification.certificationName}</td>
              <td>
                <div className="image-container">
                  {Array.isArray(certification.photos) &&
                    certification.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={`${baseApi}/${photo}`}
                        alt={`Foto ${index + 1}`}
                        className="small-image"
                        onClick={() => handlePreviewImage(certification.photos)}
                      />
                    ))}
                  {typeof certification.photos === "string" && (
                    <img
                      src={`${baseApi}/${certification.photos}`}
                      alt="Foto 1"
                      className="small-image"
                      onClick={() => handlePreviewImage(certification.photos)}
                    />
                  )}
                </div>
              </td>
              <td>{new Date(certification.joinDate).toLocaleDateString()}</td>
              <td>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteCertification(certification._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <span
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </span>
          )
        )}
      </div>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar esta certificación?
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
  );
};
