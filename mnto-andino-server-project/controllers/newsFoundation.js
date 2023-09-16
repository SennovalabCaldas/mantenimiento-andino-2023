const NewFoundations = require("../models/newsFoundation");
const image = require("../utils/image");

const createNewFoundation = async (req, res) => {
  try {
    const { ...newsFoundationData } = req.body;
    console.log(req.files.avatar);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      console.log("Archivo que llega", req.files.avatar);
      const imagePath = req.files.avatar.path; // Usar la propiedad 'path' para obtener la ruta del archivo
      console.log("imagePath", imagePath);
      newsFoundationData.avatar = imagePath;
    }
    const newsFoundationStored = new NewFoundations(
      newsFoundationData
    );
    await newsFoundationStored.save();
    res.status(201).json({
      _id: newsFoundationStored._id,
      title: newsFoundationStored.title,
      description: newsFoundationStored.description,
      avatar: newsFoundationStored.avatar,
      fecha_creacion: newsFoundationStored.fecha_creacion,
    });
    console.log(newsFoundationStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la publicación" });
  }
};

const getAllNewFoundations = async (req, res) => {
  try {
    const news = await NewFoundations.find();
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las publicaciones" });
  }
};

const getNewsFoundationById = async (req, res) => {
  try {
    console.log("LLegue a la consulta por el id en el back");
    const { id } = req.params;
    const newsFoundation = await NewFoundations.findById(id);
    console.log(newsFoundation);
    if (!newsFoundation) {
      return res.status(404).json({ mensaje: "Noticia no encontrada" });
    }
    res.status(200).json(newsFoundation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la noticia" });
  }
};

const editNewsFoundation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNewsFoundation = await NewFoundations.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el cliente actualizado en la respuesta
    });

    if (updatedNewsFoundation) {
      res.json(updatedNewsFoundation);
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

// Método para eliminar una noticia por su ID
const deleteNewsFoundation = async (req, res) => {
  try {
    const { id } = req.params;ñ
    console.log("id a eliminar", id);
    const newsFoundationDeleted =
      await NewFoundations.findByIdAndDelete(id);
    if (!newsFoundationDeleted) {
      return res.status(404).json({ mensaje: "Noticia no encontrada" });
    }
    res.status(200).json({ mensaje: "Noticia eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la noticia" });
  }
};

module.exports = {
  createNewFoundation,
  getAllNewFoundations,
  getNewsFoundationById,
  editNewsFoundation,
  deleteNewsFoundation,
};
