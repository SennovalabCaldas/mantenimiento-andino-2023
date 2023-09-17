import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { CertificationsInterNal } from "../../../components/Admin/Certifications/CertificationsInterNal/ProjectsInterNal";
import { CertificationsNal } from "../../../components/Admin/Certifications/CertificationsNal/CertificationsNal";

export const Certification = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "Proyectos Nacionales",
      render: () => (
        <Tab.Pane>
          <CertificationsNal />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Proyectos Internacionales",
      render: () => (
        <Tab.Pane>
          <CertificationsInterNal />
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
