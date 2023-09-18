import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../../actions/projectActions";

export const ProjectsNal = ({ projects, national }) => {
  console.log("Projects:", projects);
  console.log("National:", national);

  return (
    <div>
      <h3>Proyectos Nacionales</h3>
      <ul className="ui card fluid">
        {projects.map((project) => (
          <li key={project.id}>{project.projectName}</li>
        ))}
      </ul>
    </div>
  );
};
