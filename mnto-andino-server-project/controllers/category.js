const Category = require("../models/category");
const Post = require("../models/post");

// Método para crear una nueva categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, active } = req.body;
    const nuevaCategoria = new Category({
      nombre,
      active,
    });
    const categoriaGuardada = await nuevaCategoria.save();
    console.log(categoriaGuardada);
    res.status(201).json(categoriaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la categoría" });
  }
};

// Método para editar una categoría existente
const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const categoryData = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: "Categoría no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Categoría" });
  }
};

// Método para consultar todas las categorías
const obtenerTodasCategorias = async (req, res) => {
  try {
    const categorias = await Category.find();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las categorías" });
  }
};

// Método para consultar una categoría específica por su ID
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const { idCategory } = req.params; 
    const categoria = await Category.findById(idCategory);
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la categoría" });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id", id);

    // Buscar la categoría para eliminar
    const categoriaEliminada = await Category.findById(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    // Buscar los posts que pertenecen solo a la categoría eliminada
    const postsAEliminar = await Post.find({ categorias: id });

    // Eliminar o actualizar los posts asociados
    for (const post of postsAEliminar) {
      if (post.categorias.length === 1) {
        // Si el post solo pertenece a esta categoría, eliminarlo
        await Post.findByIdAndDelete(post._id);
      } else {
        // Si el post pertenece a otras categorías, quitar esta categoría
        post.categorias.pull(id);
        await post.save();
      }
    }

    // Eliminar la categoría
    await Category.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la categoría" });
  }
};

const updatePostsEstadoMostrar = async (categoryId, mostrarState) => {
  try {
    const postsToUpdate = await Post.find({ categorias: categoryId });
    console.log("Post to update backend", postsToUpdate);
    for (const post of postsToUpdate) {
      post.mostrar = mostrarState;
      await post.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el estado mostrar de los posts");
  }
};

module.exports = {
  crearCategoria,
  editarCategoria,
  obtenerTodasCategorias,
  obtenerCategoriaPorId,
  eliminarCategoria,
  updatePostsEstadoMostrar,
};
