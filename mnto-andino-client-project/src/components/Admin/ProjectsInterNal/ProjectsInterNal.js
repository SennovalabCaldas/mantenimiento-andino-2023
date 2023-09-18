import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../../actions/projectActions";

export const ProjectsInterNal = ({ projects, national }) => {
    
    
  return (
    <div>
      <h3>Proyectos Internacionales</h3>
      <ul className="ui card fluid">
        {projects.map((project) => (
          <li key={project.id}>{project.projectName}</li>
        ))}
      </ul>
    </div>
  );
};
