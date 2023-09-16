const Project = require("../models/project");

async function createProject(req, res) {
  try {
    const projectData = req.body; // Obtiene los datos del allye incluyendo la dirección como objeto JSON
    console.log("projectData", projectData);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      const imagePath = req.files.avatar.path;
      console.log("imagePath", imagePath);
      projectData.avatar = imagePath;
    }
    const projectStored = new Project(projectData);
    await projectStored.save();

    res.status(201).json({
      _id: projectStored._id,
      projectName: projectStored.projectName,
      avatar: projectStored.avatar,
      entity: projectStored.entity,
      national: projectStored.national,
      client: projectStored.client,
      joinDate: projectStored.joinDate,
    });

    console.log(projectStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el proyecto" });
  }
}

async function getAllProjects(req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las proyectos" });
  }
}

async function deleteProjectById(req, res) {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      res.json({ message: "proyecto eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la proyecto" });
  }
}

async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Proyecto no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Proyecto" });
  }
}

// Actualizar un cliente por ID
async function updateProjectById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const projectData = req.body;
    const updatedProject = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
    });
    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  deleteProjectById,
  getProjectById,
  updateProjectById,
};
