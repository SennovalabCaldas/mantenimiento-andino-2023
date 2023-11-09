import React, { useState } from "react";
import { ENV } from "../../../utils";
import {
  deleteCertification,
  getAllCertifications,
} from "../../../actions/certificationActions";
import { useDispatch } from "react-redux";
import "../CertificationsNal/CertificationsNal.scss";

export const CertificationsInterNal = ({ certifications, national }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const certificationsPerPage = 5;
  const baseApi = ENV.BASE_PATH;
  const dispatch = useDispatch();

  const handleDeleteCertification = async (certificationId) => {
    console.log("Eliminar certificación:", certificationId);
    try {
      await dispatch(deleteCertification(certificationId));
      await dispatch(getAllCertifications());
    } catch (error) {
      console.error(error);
    }
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
    </div>
  );
};
