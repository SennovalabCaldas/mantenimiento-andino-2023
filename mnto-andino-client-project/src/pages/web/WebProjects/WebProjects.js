import React from "react";
import { ENV } from "../../../utils/constants";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./WebProjects.scss"; // Importa tu archivo de estilos personalizados

export const WebProjects = ({ projects }) => {
  const baseApi = ENV.BASE_PATH;
  console.log("projects", projects);

  const extractYearAndMonth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" }); // Mes en formato de cadena, por ejemplo, "enero"
    return `${month} ${year}`;
  };

  return (
    <div className="content-web-section">
      {projects.map((project, index) => (
        <div key={project.id}>
          <ListItem
            alignItems="flex-start"
            className={
              project.national ? "national-project" : "international-project"
            }
          >
            <ListItemAvatar>
              <Avatar
                alt={project.projectName}
                src={`${baseApi}/${project.avatar}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={project.projectName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Entidad: {project.entity}
                  </Typography>
                  <Typography>
                    {project.national}
                    Fecha: {extractYearAndMonth(project.joinDate)}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {/* Aplica estilos personalizados para la línea */}
          {index !== projects.length - 1 && <hr className="custom-divider" />}
        </div>
      ))}
    </div>
  );
};
