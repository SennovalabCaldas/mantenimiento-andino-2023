import React, { useEffect } from "react";
import "./WebProjects.scss";
import { ENV } from "../../../utils";

export const WebProjects = ({ projects }) => {
  const baseApi = ENV.BASE_PATH;
  console.log(projects);

  const proyectosNacionales = projects.filter(
    (project) => project.national === true
  );

  const proyectosInternacionales = projects.filter(
    (project) => project.national === false
  );

  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(false);
  }, [projects]);

  const getAvatarUrl = (project) => {
    return `${baseApi}/${project.avatar}`;
  };

  const renderProjects = (projectList, title) => {
    return (
      <div className="gallery gallery-cards">
        <div className="content panel">
          <div className="slide" data-order="1">
            <h1>Proyectos</h1>
            <h2>
              <span className="no-select">{title}</span>
            </h2>
            <h3>
              <em>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: "0",
                    margin: "0",
                    textAlign: "center",
                    paddingBottom: "20px",
                  }}
                >
                  {projectList.map((project, index) => (
                    <li key={project._id}>
                      {index + 1}. {project.projectName}
                    </li>
                  ))}
                </ul>
              </em>
            </h3>
          </div>
          <div className="images panel">
            {loading ? (
              <div className="container">
                <div className="loader"></div>
              </div>
            ) : (
              projectList.map((project) => (
                <div className="myCard" key={project._id}>
                  <div className="innerCard">
                    <div className="frontSide">
                      <img src={getAvatarUrl(project)} alt="" />
                      <p>{project.projectName}</p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#000000",
                          opacity: "0.5",
                        }}
                      >
                        <small>{project.entity}</small>
                      </p>
                    </div>
                    <div
                      className="backSide"
                      style={{
                        backgroundImage: `url(${getAvatarUrl(project)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="projects-section">
      {renderProjects(proyectosNacionales, "nacionales")}
      {renderProjects(proyectosInternacionales, "internacionales")}
      {!loading && !projects.length && (
        <div className="no-projects-message">
          <p>No hay proyectos disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
};
