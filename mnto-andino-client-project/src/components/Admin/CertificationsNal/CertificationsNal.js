import React from "react";
import { ENV } from "../../../utils";
import "./CertificationsNal.scss";

export const CertificationsNal = ({ certifications, national }) => {
  console.log("Certificaciones:", certifications);
  console.log("National:", national);

  const baseApi = ENV.BASE_PATH;

  const handleDeleteProject = (certificationId) => {};
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
                <img
                  src={`${baseApi}/${certification.avatar}`}
                  alt="Avatar"
                  width="50"
                  height="50"
                />
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
                  onClick={() => handleDeleteProject(certification.id)}
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
