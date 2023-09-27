import React, { useState } from "react";
import { ENV } from "../../../utils";
import { deleteCertification, getAllCertifications } from "../../../actions/certificationActions";
import { useDispatch } from "react-redux";

export const CertificationsInterNal = ({ certifications, national }) => {
  const [previewImage, setPreviewImage] = useState(null);
  console.log("Certificaciones:", certifications);
  console.log("International:", national);
  const baseApi = ENV.BASE_PATH;
  const dispatch = useDispatch();

  const handleDeleteProject = async (certificationId) => {
    console.log("Eliminar certificación:", certificationId);
    try {
      await dispatch(deleteCertification(certificationId));
      await dispatch(getAllCertifications());
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditProject = (certificationId) => {};
  return (
    <div>
      <table className="certification-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Foto</th>
            <th>Fecha de inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((certification) => (
            <tr key={certification.id}>
              <td>{certification.certificationName}</td>
              <td>
                <div>
                  <img
                    src={`${baseApi}/${certification.avatar}`}
                    alt="Avatar"
                    width="50"
                    height="50"
                    onMouseEnter={() => setPreviewImage(certification.avatar)} // Mostrar la previsualización al pasar el ratón
                    onMouseLeave={() => setPreviewImage(null)} // Ocultar la previsualización al salir del ratón
                  />
                  {previewImage === certification.avatar && (
                    <div className="image-preview">
                      <img
                        src={`${baseApi}/${certification.avatar}`}
                        alt="Avatar Preview"
                        width="150"
                        height="150"
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>{new Date(certification.joinDate).toLocaleDateString()}</td>
              <td>
                <span
                  className="edit-link"
                  onClick={() => handleEditProject(certification.id)}
                >
                  Editar
                </span>
                <span
                  className="delete-link"
                  onClick={() => handleDeleteProject(certification._id)}
                >
                  Eliminar
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
