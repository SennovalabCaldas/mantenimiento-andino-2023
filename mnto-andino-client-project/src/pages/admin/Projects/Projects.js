import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { ProjectsNal } from "../../../components/Admin/ProjectList/ProjectsNal/ProjectsNal";
import { ProjectsInterNal } from "../../../components/Admin/ProjectList/ProjectsInterNal/ProjectsInterNal";

export const Projects = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "Proyectos Nacionales",
      render: () => (
        <Tab.Pane>
          <ProjectsNal />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Proyectos Internacionales",
      render: () => (
        <Tab.Pane>
          <ProjectsInterNal />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div>
      <Tab
        panes={panes}
        activeIndex={activeTab}
        onTabChange={(_, data) => setActiveTab(data.activeIndex)}
        className="custom-tab"
      />
    </div>
  );
};
