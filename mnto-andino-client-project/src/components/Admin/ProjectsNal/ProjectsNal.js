import React, { useState } from "react";
import { ENV } from "../../../utils";
import { useDispatch } from "react-redux";
import { deleteProject, getAllProjects } from "../../../actions/projectActions";
import "./ProjectsNal.scss";

export const ProjectsNal = ({ projects, national }) => {
  const baseApi = ENV.BASE_PATH;
  const dispatch = useDispatch();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteProject = async (projectId) => {
    console.log("Eliminar proyecto:", projectId);
    try {
      await dispatch(deleteProject(projectId));
      await dispatch(getAllProjects());
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProject = (projectId) => {
    // Implementa la lógica para editar el proyecto aquí
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentProjects.map((project) => (
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
                  className="delete-link"
                  onClick={() => handleDeleteProject(project._id)}
                >
                  Eliminar
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(projects.length / itemsPerPage)).keys()].map(
          (number) => (
            <span key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </span>
          )
        )}
      </div>
    </div>
  );
};
