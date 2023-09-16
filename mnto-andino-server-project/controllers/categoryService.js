const CategoryService = require("../models/categoryService");

async function createCategoryService(req, res) {
  try {
    const categoryServiceData = req.body; // Obtiene los datos del allye incluyendo la dirección como objeto JSON
    console.log("categoryServiceData", categoryServiceData);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      const imagePath = req.files.avatar.path;
      console.log("imagePath", imagePath);
      categoryServiceData.avatar = imagePath;
    }
    const categoryServiceStored = new CategoryService(categoryServiceData);
    await categoryServiceStored.save();

    res.status(201).json({
      _id: categoryServiceStored._id,
      nameCategoryService: categoryServiceStored.nameCategoryService,
      avatar: categoryServiceStored.avatar,
      active: categoryServiceStored.ative,
    });

    console.log(categoryServiceStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la categoría de servicio" });
  }
}

async function getAllCategoryServices(req, res) {
  try {
    const categories = await CategoryService.find();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las categorías de servicios" });
  }
}

async function deleteCategoryServiceById(req, res) {
  try {
    const { id } = req.params;
    const deletedCategoryService = await CategoryService.findByIdAndDelete(id);
    if (deletedCategoryService) {
      res.json({ message: "Categoría eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Categoría no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la Categoría" });
  }
}

async function getCategoryServiceById(req, res) {
  try {
    const { id } = req.params;
    const categoryService = await CategoryService.findById(id);
    if (categoryService) {
      res.json(categoryService);
    } else {
      res.status(404).json({ error: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Categoría" });
  }
}

// Actualizar un cliente por ID
async function updateCategoryServiceById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const categoryServiceData = req.body;
    const updatedCategoryService = await CategoryService.findByIdAndUpdate(
      id,
      categoryServiceData,
      {
        new: true,
      }
    );
    if (updatedCategoryService) {
      res.json(updatedCategoryService);
    } else {
      res.status(404).json({ error: "Categoría no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Categoría" });
  }
}

module.exports = {
  createCategoryService,
  getAllCategoryServices,
  deleteCategoryServiceById,
  getCategoryServiceById,
  updateCategoryServiceById,
};
