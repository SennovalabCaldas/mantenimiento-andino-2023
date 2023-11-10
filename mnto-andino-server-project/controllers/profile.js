const Profile = require("../models/profile");

const createNew = async (req, res) => {
  try {
    const profileData = req.body; 
    console.log("profile", profileData);

    const profileStored = new Profile(profileData);
    await profileStored.save();

    res.status(201).json({
      _id: profileStored._id,
      profileName: profileStored.profileName,
      feature1: profileStored.feature1,
      feature2: profileStored.feature2,
      feature3: profileStored.feature3,
      feature4: profileStored.feature4,
      contact_telephone: profileStored.contact_telephone,
      email: profileStored.email,
      contact_whatsApp: profileStored.contact_whatsApp,
      active: profileStored.active,
    });
    console.log(profileStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el perfil" });
  }
};

const getAll = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los perfiles" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (deletedProfile) {
      res.json({ message: "Perfil eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Perfil no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el perfil" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "Perfil no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};

const updateById = async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};

module.exports = {
  createNew,
  getAll,
  deleteById,
  getById,
  updateById,
};
