import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  createCertification,
  getAllCertifications,
  updateCertification,
} from "../../../actions/certificationActions";
import { CertificationsNal } from "../CertificationsNal";
import { CertificationsInterNal } from "../CertificationsInterNal";

import "./CertificationList.scss";

export const CertificationsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCertifications());
  }, [dispatch]);
  const certifications = useSelector(
    (state) => state.certification.allCertification
  );

  const [activeTab, setActiveTab] = useState(0);
  const [certificationName, setCertificationName] = useState("");
  const [national, setNational] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const nationalCertification = certifications.filter(
    (certification) => certification.national
  );
  const internationalCertification = certifications.filter(
    (certification) => !certification.national
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCertificationName("");
    setNational(true);
    setPhotos([]);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPhotos(selectedFiles);
  };

  const handleSave = async () => {
    const saveCertification = async (data) => {
      try {
        if (data._id) {
          await dispatch(updateCertification(data._id, data));
        } else {
          await dispatch(createCertification(data));
        }
        await dispatch(getAllCertifications());
      } catch (error) {
        console.error("Error al guardar la certificación:", error);
      } finally {
        handleModalClose();
      }
    };

    if (photos.length > 0) {
      let data = {
        certificationName: certificationName,
        national: national,
        photos: Array.isArray(photos) ? photos : [photos],
      };

      saveCertification(data);
    } else {
      let data = {
        certificationName: certificationName,
        national: national,
      };
      saveCertification(data);
    }
  };

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

  return (
    <div className="certifications-list-container">
      <div className="certifications-list-form">
        <h2>Crear certificación</h2>
        <Card className="card-create-certification">
          <CardContent>
            <Typography variant="h5" component="h3">
              Ingresar una nueva certificación
            </Typography>
            <form encType="multipart/form-data">
              <div className="certification-form-fields">
                <TextField
                  label="Nombre"
                  value={certificationName}
                  onChange={(e) => setCertificationName(e.target.value)}
                />
                <Switch
                  checked={national}
                  onChange={() => setNational(!national)}
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
                  accept="image/*"
                  multiple
                  id="file-input"
                  style={{ display: "none", paddingBottom: "5px" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input" style={{paddingBottom: "5px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ marginTop: "10px",paddingBottom: "5px" }}
                  >
                    Elegir archivos
                  </Button>
                </label>
                {photos.length > 0 && (
                  <div className="certification-images-preview">
                    {photos.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Foto ${index}`}
                        className="certification-image"
                      />
                    ))}
                  </div>
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
      </div>
      <div className="certifications-list-tabs">
        <Card className="card-list-certification">
          <Tab
            panes={panes}
            activeIndex={activeTab}
            onTabChange={(_, data) => setActiveTab(data.activeIndex)}
            className="custom-tab"
          />
        </Card>
      </div>
    </div>
  );
};
