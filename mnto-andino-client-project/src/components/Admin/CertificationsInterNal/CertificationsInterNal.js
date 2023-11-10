import React, { useState } from "react";
import { ENV } from "../../../utils";
import {
  deleteCertification,
  getAllCertifications,
} from "../../../actions/certificationActions";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import "../CertificationsNal/CertificationsNal.scss";

export const CertificationsInterNal = ({ certifications, national }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState(null);
  const certificationsPerPage = 5;
  const baseApi = ENV.BASE_PATH;
  const dispatch = useDispatch();

  const handleDeleteCertification = (certificationId) => {
    setCertificationToDelete(certificationId);
    setDeleteConfirmationOpen(true);
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

  const indexOfLastCertification = currentPage * certificationsPerPage;
  const indexOfFirstCertification =
    indexOfLastCertification - certificationsPerPage;
  const currentCertifications = certifications.slice(
    indexOfFirstCertification,
    indexOfLastCertification
  );

  const handlePreviewImage = (avatar) => {
    setPreviewImage(avatar);
  };

  const handleHidePreviewImage = () => {
    setPreviewImage(null);
  };

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
                  {certification.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`${baseApi}/${photo}`}
                      alt={`Foto ${index + 1}`}
                      className="small-image"
                      onClick={() => handlePreviewImage(photo)}
                    />
                  ))}
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
        {Array.from(
          { length: Math.ceil(certifications.length / certificationsPerPage) },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <span
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
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
