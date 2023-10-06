import React, { useState } from "react";
import "./WebProjects.scss";
import { ENV } from "../../../utils";
export const Project = ({ project }) => {
  const baseApi = ENV.BASE_PATH;
  const [mostrarInfo, setMostrarInfo] = useState(false);

  return (
    <>
        <div
          className={`project-card ${
            project.national ? "national" : "international"
          }`}
        >
          <img
            src={`${baseApi}/${project.avatar}`}
            alt={project.projectName}
            className="project-image"
          />
          <div className="project-details">
            <h3 className="project-name">{project.projectName}</h3>
            <p className="project-type">
              {project.national ? "Nacional" : "Internacional"}
            </p>
          </div>
          <div className="project-info">
            <p className="project-join-date">
              Fecha de ingreso: {project.joinDate}
            </p>
            <p className="project-description">{project.description}</p>
          </div>
        </div>
    </>
  );
};
