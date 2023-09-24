import React, { useEffect } from "react";
import {ENV} from "../../../utils";

export const ProjectsNal = ({ projects, national }) => {
  console.log("Projects:", projects);
  console.log("National:", national);
  const baseApi = ENV.BASE_PATH;

  const handleDeleteProject = (projectId) => {};
  const handleEditProject = (projectId) => {};
  return (
    <div>
      <table className="project-table">
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>Entidad</th>
            <th>Foto</th>
            <th>Nacional</th>
            <th>Cliente</th>
            <th>Fecha de inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.entity}</td>
              <td>
                <img
                  src={`${baseApi}/${project.avatar}`}
                  alt="Avatar"
                  width="50"
                  height="50"
                />
              </td>
              <td>{project.national ? "Sí" : "No"}</td>
              <td>{project.client}</td>
              <td>{new Date(project.joinDate).toLocaleDateString()}</td>
              <td>
                <span
                  className="edit-link"
                  onClick={() => handleEditProject(project.id)}
                >
                  Editar
                </span>
                <span
                  className="delete-link"
                  onClick={() => handleDeleteProject(project.id)}
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
