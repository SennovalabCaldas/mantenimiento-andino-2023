const Post = require("../models/post");
const image = require("../utils/image");
const Categoria = require("../models/category");

const createNew = async (req, res) => {
  try {
    const { categorias, ...postData } = req.body;
    console.log("categorias", categorias);
    console.log(req.files.avatar);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      console.log("Archivo que llega", req.files.avatar);
      const imagePath = req.files.avatar.path; // Usar la propiedad 'path' para obtener la ruta del archivo
      console.log("imagePath", imagePath);
      postData.avatar = imagePath;
    }
    const postStored = new Post(postData);
    await postStored.save();
    res.status(201).json({
      _id: postStored._id,
      titulo: postStored.titulo,
      subtitulo: postStored.subtitulo,
      descripcion: postStored.descripcion,
      avatar: postStored.avatar,
      fecha_creacion: postStored.fecha_creacion,
      active: postStored.active,
      categorias: postStored.categorias,
    });
    console.log(postStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la publicación" });
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await Post.find();
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las publicaciones" });
  }
};

const editarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { categorias, ...postData } = req.body;
    console.log(req.files.avatar);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      console.log("Archivo que llega", req.files.avatar);
      const imagePath = req.files.avatar.path; // Usar la propiedad 'path' para obtener la ruta del archivo
      console.log("imagePath", imagePath);
      postData.avatar = imagePath;
    }
    const postStored = new Post(postData);
    await postStored.save();
    res.status(201).json({
      _id: postStored._id,
      titulo: postStored.titulo,
      subtitulo: postStored.subtitulo,
      descripcion: postStored.descripcion,
      avatar: postStored.avatar,
      fecha_creacion: postStored.fecha_creacion,
      active: postStored.active,
      categorias: postStored.categorias,
    });
    console.log(postStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la publicación" });
  }
};

// Método para consultar una noticia específica por su ID
const obtenerNoticiaPorId = async (req, res) => {
  try {
    console.log("LLegue a la consulta por el id en el back");
    const { id } = req.params;
    const noticia = await Post.findById(id);
    console.log(noticia);
    if (!noticia) {
      return res.status(404).json({ mensaje: "Noticia no encontrada" });
    }
    res.status(200).json(noticia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la noticia" });
  }
};

// Función para obtener los posts asociados con una categoría
const getPostsAssociatedWithCategory = async (categoryId) => {
  try {
    const posts = await Post.find({ categorias: categoryId });
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error al obtener los posts asociados:", error);
    throw error;
  }
};

// Método para eliminar una noticia por su ID
const eliminarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id a eliminar", id);
    const noticiaEliminada = await Post.findByIdAndDelete(id);
    if (!noticiaEliminada) {
      return res.status(404).json({ mensaje: "Noticia no encontrada" });
    }
    res.status(200).json({ mensaje: "Noticia eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la noticia" });
  }
};

module.exports = {
  createNew,
  getAllNews,
  obtenerNoticiaPorId,
  eliminarNoticia,
  editarNoticia,
  getPostsAssociatedWithCategory,
};
