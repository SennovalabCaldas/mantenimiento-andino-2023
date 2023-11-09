import React from "react";
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

  const hasNationalProjects = proyectosNacionales.length > 0;
  const hasInternationalProjects = proyectosInternacionales.length > 0;
  const getAvatarUrl = (project) => {
    return `${baseApi}/${project.avatar}`;
  };
  return (
    <>
      <div className="projects-section">
        {hasNationalProjects && (
          <div className="gallery gallery-cards">
            <div className="content panel">
              <div className="slide" data-order="1">
                <h2>
                  <span className="no-select">Proyectos nacionales</span>
                </h2>
              </div>
              <div className="images panel">
                {proyectosNacionales.length === 0 ? (
                  <>
                    <div className="container">
                      <div className="loader"></div>
                    </div>
                  </>
                ) : (
                  proyectosNacionales.map((project) => (
                    <div className="myCard" key={project._id}>
                      <div className="innerCard">
                        <div className="frontSide">
                          <img src={getAvatarUrl(project)} alt="" />
                          <p>{project.projectName}</p>
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
        )}
        {hasInternationalProjects && (
          <div className="gallery gallery-cards">
            <div className="content panel">
              <div className="images panel">
                {proyectosInternacionales.length === 0 ? (
                  <>
                    <div className="container">
                      <div className="loader"></div>
                    </div>
                  </>
                ) : (
                  proyectosInternacionales.map((project, index) => (
                    <div className="myCard" key={project._id}>
                      <div className="innerCard">
                        <div className="frontSide">
                          <img src={getAvatarUrl(project)} alt="" />
                          <p>{project.projectName}</p>
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
              <div className="slide" data-order="1">
                <h2>
                  <span className="no-select">Proyectos internacionales</span>
                </h2>
              </div>
            </div>
          </div>
        )}
        {!hasNationalProjects && !hasInternationalProjects && (
          <div className="no-projects-message">
            <p>No hay proyectos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </>
  );
};
