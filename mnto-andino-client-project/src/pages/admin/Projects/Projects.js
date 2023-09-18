import React, { useEffect } from "react";
import { ProjectList } from "../../../components/Admin/ProjectsList";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../../actions/projectActions";
import { useDispatch } from "react-redux";

export const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllProjects());
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const projects = useSelector((state) => state.project.allProjects) || [];
console.log("projects:", projects);
  return (
    <div>
      <ProjectList />
    </div>
  );
};
