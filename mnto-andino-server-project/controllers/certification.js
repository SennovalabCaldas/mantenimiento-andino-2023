const Certification = require("../models/certification");

async function createCertification(req, res) {
  try {
    const certificationData = req.body; // Obtiene los datos del allye incluyendo la dirección como objeto JSON
    console.log("certificationdata", certificationData);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      const imagePath = req.files.avatar.path;
      console.log("imagePath", imagePath);
      certificationData.avatar = imagePath;
    }
    const allyStored = new Certification(certificationData);
    await allyStored.save();

    res.status(201).json({
      _id: allyStored._id,
      certificationName: allyStored.certificationName,
      avatar: allyStored.avatar,
      national: allyStored.national,
      joinDate: allyStored.joinDate, // Devuelve el objeto de dirección completo
    });

    console.log(allyStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la certificación" });
  }
}

async function getAllCertifications(req, res) {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las certificaciones" });
  }
}

async function deleteCertificationById(req, res) {
  try {
    const { id } = req.params;
    const deletedCertification = await Certification.findByIdAndDelete(id);
    if (deletedCertification) {
      res.json({ message: "Certificación eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Certificación no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la Certificación" });
  }
}

async function getCertificationById(req, res) {
  try {
    const { id } = req.params;
    const certification = await Certification.findById(id);
    if (certification) {
      res.json(certification);
    } else {
      res.status(404).json({ error: "Certificación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la Certificación" });
  }
}

// Actualizar un cliente por ID
async function updateCertificationById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const certificationData = req.body;
    const updatedCertification = await Certification.findByIdAndUpdate(
      id,
      certificationData,
      {
        new: true,
      }
    );
    if (updatedCertification) {
      res.json(updatedCertification);
    } else {
      res.status(404).json({ error: "Certificación no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la certificación" });
  }
}

module.exports = {
  createCertification,
  getAllCertifications,
  deleteCertificationById,
  getCertificationById,
  updateCertificationById,
};
