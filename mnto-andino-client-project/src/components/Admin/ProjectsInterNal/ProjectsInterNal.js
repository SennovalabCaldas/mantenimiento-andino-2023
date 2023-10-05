import React from "react";
import { ENV } from "../../../utils";
import { useDispatch } from "react-redux";
import { deleteProject, getAllProjects } from "../../../actions/projectActions";

export const ProjectsInterNal = ({ projects, national }) => {
  console.log("Projects:", projects);
  console.log("National:", national);
  const dispatch = useDispatch();

  const baseApi = ENV.BASE_PATH;

  const handleDeleteProject = async (projectId) => {
    console.log("Eliminar proyecto:", projectId);
    try {
      await dispatch(deleteProject(projectId));
      await dispatch(getAllProjects());
    } catch (error) {
      console.error(error);
    }
  };
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
                  onClick={() => handleDeleteProject(project._id)}
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
