import React from "react";
import { Project } from "./Project";

export const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </div>
  );
};
