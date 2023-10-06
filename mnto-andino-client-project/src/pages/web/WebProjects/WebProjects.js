import React from "react";
import "./WebProjects.scss";
import { image } from "../../../assets";
import { Box, Grid, ImageList, ImageListItem, Paper } from "@mui/material";
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
    projectName: "Edificaciones Túnel Telasia.",
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
        <a className="title-mnto-andino" href="#">
          <span className="smaller-text">enterate de nuestros proyectos
          de gran éxito </span> nacional
        </a>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {proyectosNacionales.map((project, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <div
                  className={`project-card ${
                    project.national ? "national" : "international"
                  }`}
                >
                  <img src={getAvatarUrl(project)} alt={project.projectName} />
                  <div className="project-details">
                    <h4 className="project-name">{project.projectName}</h4>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {proyectosInternacionales.map((project, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <div
                  className={`project-card ${
                    project.national ? "national" : "international"
                  }`}
                >
                  <img src={getAvatarUrl(project)} alt={project.projectName} />
                  <div className="project-details">
                    <h4 className="project-name">{project.projectName}</h4>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
