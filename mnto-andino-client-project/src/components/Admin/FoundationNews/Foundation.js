import React, { useState } from "react";
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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  createProject,
  getAllProjects,
  updateProject,
} from "../../../actions/projectActions";

export const Foundation = () => {
  // const dispatch = useDispatch();
  // const [activeTab, setActiveTab] = useState(0);
  // const [foundationName, setFoundationName] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState(null);
  // const [avatar, setAvatar] = useState(null);
  // const [newProject, setNewProject] = useState({
  //   foundationName: "",
  //   active: true,
  //   avatar: [],
  // });

  // const [editingProject, setEditingProject] = useState({
  //   foundationName: "",
  //   active: true,
  //   avatar: [],
  // });

  // const panes = [
  //   {
  //     menuItem: "Proyectos Nacionales",
  //     render: () => (
  //       <Tab.Pane>
  //         <ProjectsNal />
  //       </Tab.Pane>
  //     ),
  //   },
  //   {
  //     menuItem: "Proyectos Internacionales",
  //     render: () => (
  //       <Tab.Pane>
  //         <ProjectsInterNal />
  //       </Tab.Pane>
  //     ),
  //   },
  // ];

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const blob = new Blob([file], { type: file.type });
  //     setAvatar({
  //       blob,
  //       image: file,
  //     });
  //     const imageUrl = URL.createObjectURL(file);
  //     setAvatarPreview(imageUrl);
  //   }
  // };

  // const handleSave = async () => {
  //   const data = {
  //     ...newProject,
  //     foundationName: foundationName,
  //     active: editingProject.active,
  //     avatar: avatar,
  //   };
  //   console.log("Guardando datos de project:", data);
  //   if (data._id) {
  //     console.log("Updating project", data._id);
  //     console.log(data._id);
  //     await dispatch(updateProject(data._id, data));
  //   } else {
  //     console.log("Saving new project", data);
  //     await dispatch(createProject(data));
  //   }
  //   await dispatch(getAllProjects());
  // };

  // return (
  //   <div>
  //     <h2>Crear proyecto</h2>

  //     <Card>
  //       <CardContent>
  //         <Typography variant="h5" component="h3">
  //           Ingresar un nuevo proyecto
  //         </Typography>
  //         <form encType="multipart/form-data">
  //           <div style={{ display: "flex", alignItems: "center" }}>
  //             <TextField
  //               label="Nombre"
  //               value={foundationName}
  //               onChange={(e) => setFoundationName(e.target.value)}
  //             />
  //             <input
  //               type="file"
  //               id="imageUpload"
  //               style={{ display: "none" }}
  //               onChange={handleAvatarChange}
  //             />
  //             {/* Button to trigger file input */}
  //             <Button
  //               onClick={() => document.getElementById("imageUpload").click()}
  //               variant="contained"
  //               color="primary"
  //             >
  //               Upload Image
  //             </Button>
  //             <Switch
  //               checked={newProject.active}
  //               onChange={(e) =>
  //                 setNewProject({
  //                   ...newProject,
  //                   active: e.target.checked,
  //                 })
  //               }
  //               color="primary"
  //               inputProps={{ "aria-label": "Categoría activa" }}
  //             />
  //             <Typography>
  //               {newProject.active ? "Categoría activa" : "Categoría inactiva"}
  //             </Typography>
  //             <Button onClick={handleSave} variant="contained" color="primary">
  //               Crear
  //             </Button>
  //           </div>
  //         </form>
  //       </CardContent>
  //     </Card>
  //     <Tab
  //       panes={panes}
  //       activeIndex={activeTab}
  //       onTabChange={(_, data) => setActiveTab(data.activeIndex)}
  //       className="custom-tab"
  //     />
  //   </div>
  // );
};
