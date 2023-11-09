import React, { useState } from "react";
import { ENV } from "../../../utils";
import "./CertificationsNal.scss";
import {
  deleteCertification,
  getAllCertifications,
} from "../../../actions/certificationActions";
import { useDispatch } from "react-redux";

export const CertificationsNal = ({ certifications, national }) => {
  const dispatch = useDispatch();
  const baseApi = ENV.BASE_PATH;
  const certificationsPerPage = 5;
  const totalPages = Math.ceil(certifications.length / certificationsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteCertification = async (certificationId) => {
    console.log("Eliminar certificación:", certificationId);
    try {
      await dispatch(deleteCertification(certificationId));
      await dispatch(getAllCertifications());
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviewImage = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      setPreviewImage(photos[0]); // Muestra la primera foto si hay varias
    } else if (typeof photos === 'string') {
      setPreviewImage(photos); // Muestra la única foto si hay solo una
    }
  };

  const indexOfLastCertification = currentPage * certificationsPerPage;
  const indexOfFirstCertification = indexOfLastCertification - certificationsPerPage;
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
                  {typeof certification.photos === 'string' && (
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
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCertification(certification._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <span
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
      </div>
    </div>
  );
};
