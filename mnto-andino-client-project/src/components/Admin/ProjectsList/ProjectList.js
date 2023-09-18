import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { ProjectsInterNal } from "../ProjectsInterNal";
import { ProjectsNal } from "../ProjectsNal";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import {
  createProject,
  getAllProjects,
  updateProject,
} from "../../../actions/projectActions";
import { useSelector } from "react-redux";
import { getAllClients } from "../../../actions/clientActions";

export const ProjectList = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const projects = useSelector((state) => state.project.allProjects);
  console.log("Projects:", projects);

  const [client, setClient] = useState("");
  const nationalProjects = projects.filter((project) => project.national);
  const internationalProjects = projects.filter((project) => !project.national);

  const [activeTab, setActiveTab] = useState(0);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [entity, setEntity] = useState("");
  const [national, setNational] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [newProject, setNewProject] = useState({
    projectName: "",
    entity: "",
    client: "",
    national: true,
    avatar: [],
    joinDate: new Date().toISOString(),
  });
  const [editingProject, setEditingProject] = useState(null);
  const [editedProject, setEditedProject] = useState({
    projectName: "",
    entity: "",
    client: "",
    national: true,
    avatar: [],
    joinDate: new Date().toISOString(),
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllClients());
  }, [dispatch]);

  const panes = [
    {
      menuItem: "Proyectos Nacionales",
      render: () => (
        <Tab.Pane>
          <ProjectsNal projects={nationalProjects} national={true}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Proyectos Internacionales",
      render: () => (
        <Tab.Pane>
          <ProjectsInterNal projects={internationalProjects} national={false}/>
        </Tab.Pane>
      ),
    },
  ];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingProject(null);
    setIsEditing(false);
    setEditedProject({
      projectName: "",
      entity: "",
      client: "",
      national: true,
      avatar: [],
      joinDate: new Date().toISOString(),
    });
  };

  const handleSave = async () => {
    const data = {
      ...newProject,
      projectName: projectName,
      client: client,
      entity: entity,
      national: national,
      avatar: avatar,
      joinDate: new Date().toISOString(),
    };
    console.log("Guardando datos de project:", data);
    if (data._id) {
      console.log("Updating project", data._id);
      console.log(data._id);
      await dispatch(updateProject(data._id, data));
    } else {
      console.log("Saving new project", data);
      await dispatch(createProject(data));
    }
    await dispatch(getAllProjects());

    setProjectName("");
    setEntity("");
    setClient("");
    setAvatarPreview(null);
    setAvatar(null);
    setNewProject({
      projectName: "",
      entity: "",
      client: "",
      national: true,
      avatar: [],
      joinDate: new Date().toISOString(),
    });
  };

  const handleUpdateProject = async () => {
    setIsCreatingProject(true);
    try {
      console.log("Updated Photos:", editingProject.avatar);
      const updatedProject = {
        ...editingProject,
        avatar: editingProject.avatar,
      };
      console.log("Updated project:", updatedProject);
      await dispatch(updateProject(editingProject._id, updatedProject));
      await dispatch(getAllProjects());
      setIsEditing(false);
      handleModalClose();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };
  return (
    <div>
      <h2>Crear proyecto</h2>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h3">
            Ingresar un nuevo proyecto
          </Typography>
          <form encType="multipart/form-data">
            <div className="card-project-style">
              <TextField
                label="Nombre"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <TextField
                label="Entidad"
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="service-label">
                  Selecciona un cliente
                </InputLabel>
                <Select
                  labelId="service-label"
                  id="service-select"
                  value={client}
                  onChange={(e) => {
                    setClient(e.target.value);
                    setEditingProject({
                      ...editingProject,
                      client: e.target.value,
                    });
                  }}
                >
                  {clients.map((cli) => (
                    <MenuItem key={cli._id} value={cli._id}>
                      {cli.clientName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Switch
                checked={national}
                onChange={(e) => setNational(e.target.checked)}
                color="primary"
                inputProps={{ "aria-label": "Proyecto Nacional" }}
              />
              <Typography>
                {newProject.national
                  ? "Proyecto Nacional"
                  : "Proyecto Internacional"}
              </Typography>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <Button
                onClick={() => document.getElementById("imageUpload").click()}
                variant="contained"
                color="primary"
              >
                Upload Image
              </Button>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  style={{ height: "100px" }}
                />
              )}
              <Button onClick={handleSave} variant="contained" color="primary">
                Crear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Tab
        panes={panes}
        activeIndex={activeTab}
        onTabChange={(_, data) => setActiveTab(data.activeIndex)}
        className="custom-tab"
      />
    </div>
  );
};
