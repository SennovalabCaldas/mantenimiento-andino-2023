import React from "react";
import { ENV } from "../../../utils/constants";
import "./WebProjects.scss";
import {
  Avatar,
  Chip,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import { image } from "../../../assets";

const baseApi = ENV.BASE_PATH;

export const WebProjects = ({ projects }) => {
  const image_route = image.fondo1;
  const nationalProjects = projects.filter((item) => item.national === true);
  const internationalProjects = projects.filter(
    (item) => item.national === false
  );

  return (
    <div className="projects-section">
      <div className="all-projects">
        <h2>Proyectos Nacionales</h2>
    
        <ImageList
          className="national-projects"
          variant="woven"
          cols={3}
          gap={8}
        >
          {nationalProjects.map((item) => {
            const imageUrl = `${baseApi}/${item.avatar}?w=161&fit=crop&auto=format`;

            return (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${imageUrl}&dpr=2 2x`}
                  src={imageUrl}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={item.projectName} position="below" />
                <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
              </ImageListItem>
            );
          })}
        </ImageList>

        <h2>Proyectos Internationales</h2>
     
        <ImageList
          className="international-projects"
          variant="woven"
          cols={3}
          gap={8}
        >
          {internationalProjects.map((item) => {
            const imageUrl = `${baseApi}/${item.avatar}?w=161&fit=crop&auto=format`;

            return (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${imageUrl}&dpr=2 2x`}
                  src={imageUrl}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={item.projectName} position="below" />
                <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </div>
  );
};
