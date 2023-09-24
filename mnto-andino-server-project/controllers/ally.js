const Ally = require("../models/ally");

// Crear un nuevo cliente
async function createAlly(req, res) {
  try {
    const allyData = req.body; // Obtiene los datos del allye incluyendo la dirección como objeto JSON
    console.log("allydata", allyData);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      const imagePath = req.files.avatar.path;
      console.log("imagePath", imagePath);
      allyData.avatar = imagePath;
    }
    const allyStored = new Ally(allyData);
    await allyStored.save();

    res.status(201).json({
      _id: allyStored._id,
      allyName: allyStored.allyName,
      avatar: allyStored.avatar,
      active: allyStored.active,
      national: allyStored.national,
    });

    console.log(allyStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el aliado" });
  }
}

// Obtener todos los clientes
async function getAllAllyes(req, res) {
  try {
    const allyes = await Ally.find();
    res.json(allyes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los aliados" });
  }
}

// Eliminar un cliente por ID
async function deleteAllyById(req, res) {
  try {
    const { id } = req.params;
    const deletedAlly = await Ally.findByIdAndDelete(id);
    if (deletedAlly) {
      res.json({ message: "Aliado eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Aliado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Aliado" });
  }
}

// Obtener un cliente por ID
async function getAllyById(req, res) {
  try {
    const { id } = req.params;
    const ally = await Ally.findById(id);
    if (ally) {
      res.json(ally);
    } else {
      res.status(404).json({ error: "Proveedor no aliado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el aliado" });
  }
}

// Actualizar un cliente por ID
async function updateAllyById(req, res) {
  console.log("updateAllyById");
  try {
    const { id } = req.params;
    console.log("id", id);
    const allyData = req.body;
    const updatedAlly = await Ally.findByIdAndUpdate(
      id,
      allyData,
      {
        new: true,
      }
    );
    if (updatedAlly) {
      res.json(updatedAlly);
    } else {
      res.status(404).json({ error: "Aliado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el aliado" });
  }
}

module.exports = {
  createAlly,
  getAllAllyes,
  deleteAllyById,
  getAllyById,
  updateAllyById,
};
