import React from "react";
import "./WebProjects.scss";
import { image } from "../../../assets";
import { ProjectList } from "./ProjectList";
import { ImageList, ImageListItem } from "@mui/material";

const proyectosBase = [
  {
    projectName: "Proyecto Unoooo",
    national: true,
    avatar: "URL_de_la_imagen_1",
    joinDate: "2021-10-10",
  },
  {
    projectName: "Proyecto Dooooss",
    national: true,
    avatar: "URL_de_la_imagen_2",
    joinDate: "2021-10-10",
  },
];
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
export const WebProjects = ({ projects }) => {
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

  const imagesScroll = [
    {
      img: image.project1,
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: image.project2,
      title: "Burger",
    },
    {
      img: image.project3,
      title: "Camera",
    },
    {
      img: image.project4,
      title: "Coffee",
      cols: 2,
    },
    {
      img: image.project5,
      title: "Hats",
      cols: 2,
    },
    {
      img: image.project6,
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
    },
    {
      img: image.project7,
      title: "Basketball",
    },
    {
      img: image.project8,
      title: "Fern",
    },
    {
      img: image.project9,
      title: "Mushrooms",
      rows: 2,
      cols: 2,
    },
    {
      img: image.project10,
      title: "Tomato basil",
    },
    {
      img: image.project11,
      title: "Sea star",
    },
    {
      img: image.project12,
      title: "Bike",
      cols: 2,
    },
    {
      img: image.project13,
      title: "Coffee",
      cols: 2,
    },
    {
      img: image.project14,
      title: "Hats",
      cols: 2,
    },
    {
      img: image.project15,
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: image.project16,
      title: "Burger",
    },
    {
      img: image.project17,
      title: "Camera",
    },
    {
      img: image.project18,
      title: "Coffee",
      cols: 2,
    },
  ];

  const proyectosNacionales = combinedProjects.filter(
    (project) => project.national === true
  );

  // Filtra los proyectos internacionales
  const proyectosInternacionales = combinedProjects.filter(
    (project) => project.national === false
  );

  return (
    <>
      <div className="projects-section">
        <h2>Proyectos</h2>
        <div className="project-list">
          <h2>Proyectos Nacionales</h2>
          <ProjectList projects={proyectosNacionales} />

          <h2>Proyectos Internacionales</h2>
          <ProjectList projects={proyectosInternacionales} />
        </div>
        <div className="collage-project-list">
          <ImageList
            sx={{ width: 500, height: 650 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {imagesScroll.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </>
  );
};
