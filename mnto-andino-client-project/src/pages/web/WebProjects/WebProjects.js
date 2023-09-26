import React from "react";
import { ENV } from "../../../utils/constants";

import "./WebProjects.scss";
import { ImageList, ImageListItem } from "@mui/material";

export const WebProjects = ({ projects }) => {
  const baseApi = ENV.BASE_PATH;
  console.log("projects", projects);

  const extractYearAndMonth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" }); // Mes en formato de cadena, por ejemplo, "enero"
    return `${month} ${year}`;
  };

  const srcset = (image, size, rows = 1, cols = 1) => {
    const imageUrl = `${baseApi}/${image}`; // Agrega la ruta base de API
    return {
      src: `${imageUrl}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${imageUrl}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  return (
    <div className="content-web-section">
      <ImageList
        sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {projects.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.avatar, 121, item.rows, item.cols)}
              alt={item.projectName}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
