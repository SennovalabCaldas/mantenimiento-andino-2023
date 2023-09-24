import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch } from "react-redux";
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

import "./CertificationList.scss";
import { useSelector } from "react-redux";
import {
  createCertification,
  getAllCertifications,
  updateCertification,
} from "../../../actions/certificationActions";
import { CertificationsNal } from "../CertificationsNal";
import { CertificationsInterNal } from "../CertificationsInterNal";

export const CertificationsList = () => {
  const dispatch = useDispatch();
  const certifications = useSelector(
    (state) => state.certification.allCertification
  );
  console.log("Certificaciones:", certifications);

  const [activeTab, setActiveTab] = useState(0);
  const [isCreatingCertification, setIsCreatingCertification] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [certificationName, setCertificationName] = useState("");
  const [national, setNational] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [newCertification, setNewCertification] = useState({
    certificationName: "",
    national: true,
    avatar: [],
    joinDate: new Date().toISOString(),
  });

  const [editingCertification, setEditingCertification] = useState(null);
  const [editedCertification, setEditedCertification] = useState({
    certificationName: "",
    national: true,
    avatar: [],
    joinDate: new Date().toISOString(),
  });

  const nationalCertification = certifications.filter(
    (certification) => certification.national
  );
  const internationalCertification = certifications.filter(
    (certification) => !certification.national
  );
  console.log("Certificaciones nacionales:", nationalCertification);
  console.log("Certificaciones internacionales:", internationalCertification);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllCertifications());
  }, [dispatch]);

  const panes = [
    {
      menuItem: "Certificaciones Nacionales",
      render: () => (
        <Tab.Pane>
          <CertificationsNal
            certifications={nationalCertification}
            national={false}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Certificaciones Internacionales",

      render: () => (
        <Tab.Pane>
          <CertificationsInterNal
            certifications={internationalCertification}
            national={true}
          />
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
    setEditingCertification(null);
    setIsEditing(false);
    setEditedCertification({
      certificationName: "",
      national: true,
      avatar: [],
      joinDate: new Date().toISOString(),
    });
  };

  const handleSave = async () => {
    const data = {
      ...newCertification,
      certificationName: certificationName,
      national: national,
      avatar: avatar,
      joinDate: new Date().toISOString(),
    };
    console.log("Guardando datos de certificación:", data);
    if (data._id) {
      console.log("Updating certificación", data._id);
      console.log(data._id);
      await dispatch(updateCertification(data._id, data));
    } else {
      console.log("Saving new certificación", data);
      await dispatch(createCertification(data));
    }
    await dispatch(getAllCertifications());
    setCertificationName("");
    setNational(true);
    setAvatarPreview(null);
    setAvatar(null);
    setNewCertification({
      certificationName: "",
      national: true,
      avatar: [],
      joinDate: new Date().toISOString(),
    });
  };

  const handleUpdateCertification = async () => {
    setIsCreatingCertification(true);
    try {
      console.log("Updated Photos:", editingCertification.avatar);
      const updatedCertification = {
        ...editingCertification,
        avatar: editingCertification.avatar,
      };
      console.log("Updated certification:", updatedCertification);
      await dispatch(
        updateCertification(editingCertification._id, updatedCertification)
      );
      await dispatch(getAllCertifications());
      setIsEditing(false);
      handleModalClose();
    } catch (error) {
      console.error("Error updating certification:", error);
    }
  };
  return (
    <>
      <div>
        <h2>Crear certificación</h2>

        <Card className="card-create-project">
          <CardContent>
            <Typography variant="h5" component="h3">
              Ingresar una nueva certificación
            </Typography>
            <form encType="multipart/form-data">
              <div className="card-project-style">
                <TextField
                  label="Nombre"
                  value={certificationName}
                  onChange={(e) => setCertificationName(e.target.value)}
                />
                <Switch
                  checked={national}
                  onChange={(e) => setNational(e.target.checked)}
                  color="primary"
                  inputProps={{ "aria-label": "Certificación Nacional" }}
                />
                <Typography>
                  {national
                    ? "Certificación Nacional"
                    : "Certificación Internacional"}
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
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  Crear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="card-list-project">
          <Tab
            panes={panes}
            activeIndex={activeTab}
            onTabChange={(_, data) => setActiveTab(data.activeIndex)}
            className="custom-tab"
          />
        </Card>
      </div>
    </>
  );
};
