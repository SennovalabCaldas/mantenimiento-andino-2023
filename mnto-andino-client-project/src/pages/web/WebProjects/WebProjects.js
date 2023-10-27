import React from "react";
import "./WebProjects.scss";
import { image } from "../../../assets";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { ENV } from "../../../utils";
import { styled } from "@mui/material/styles";
const proyectosBase = [
  {
    projectName:
      "Centro de control y operaciones. Autopista Conexión Pacífico II.",
    national: true,
    avatar: image.concesion,
    joinDate: "2021-10-10",
  },
  {
    projectName: "Edificaciones Túnel Tesalia.",
    national: true,
    avatar: image.telacia,
    joinDate: "2021-10-10",
  },
  {
    projectName: "Área de servicios II. Autopista Conexión Pacífico II.",
    national: true,
    avatar: image.servicio3,
    joinDate: "2021-10-10",
  },
  {
    projectName:
      "Muro de cerramiento Proyecto ampliación a tercer carril vía Bogotá - Girardot.",
    national: true,
    avatar: image.cerramiento,
    joinDate: "2021-10-10",
  },
  {
    projectName: "Centro vacacional Melgar CAFAM - Remodelación de cabañas.",
    national: true,
    avatar: image.cabañas,
    joinDate: "2021-10-10",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const WebProjects = ({ projects }) => {
  const baseApi = ENV.BASE_PATH;
  console.log(projects);

  const combinedProjects = [
    ...proyectosBase,
    ...projects.filter(
      (project) =>
        !proyectosBase.some(
          (baseProject) => baseProject.projectName === project.projectName
        )
    ),
  ];

  const proyectosNacionales = combinedProjects.filter(
    (project) => project.national === true
  );

  const proyectosInternacionales = combinedProjects.filter(
    (project) => project.national === false
  );
  const getAvatarUrl = (project) => {
    if (
      proyectosBase.some(
        (baseProject) => baseProject.projectName === project.projectName
      )
    ) {
      return project.avatar;
    } else {
      return `${baseApi}/${project.avatar}`;
    }
  };
  return (
    <>
      <div className="projects-section">
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
                  <div class="container">
                    <div class="loader"></div>
                  </div>
                </>
              ) : (
                proyectosNacionales.map((project, index) => (
                  <div class="myCard">
                    <div class="innerCard">
                      <div class="frontSide">
                        <img src={getAvatarUrl(project)} alt="" />
                        <p>{project.projectName}</p>
                      </div>
                      <div
                        class="backSide"
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
        <div className="gallery gallery-cards">
          <div className="content panel">
            <div className="images panel">
              {proyectosInternacionales.length === 0 ? (
                <>
                  <div class="container">
                    <div class="loader"></div>
                  </div>
                </>
              ) : (
                proyectosInternacionales.map((project, index) => (
                  <div class="myCard">
                    <div class="innerCard">
                      <div class="frontSide">
                        <img src={getAvatarUrl(project)} alt="" />
                        <p>{project.projectName}</p>
                      </div>
                      <div
                        class="backSide"
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
      </div>
    </>
  );
};
