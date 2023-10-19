const CategoryService = require("../models/categoryService");

async function createCategoryService(req, res) {
  console.log("Contenido de req.body:", req.body);
  try {
    const categoryServiceData = req.body; 
    console.log("categoryServiceData", categoryServiceData);

    if (!req.file) {
      return res.status(400).json({ msg: "Error: Debes subir una imagen." });
    }

    categoryServiceData.avatar = await req.file.path; 
    const newCategoryService = new CategoryService({ ...categoryServiceData });
    console.log("newCategoryService", newCategoryService);

    // Guarda la categoría de servicio en la base de datos
    const savedCategoryService = await newCategoryService.save();
    console.log("savedCategoryService", savedCategoryService);

    // Devuelve una respuesta exitosa
    res.status(201).json({
      _id: savedCategoryService._id,
      nameCategoryService: savedCategoryService.nameCategoryService,
      descriptionCategoryService:
        savedCategoryService.descriptionCategoryService,
      avatar: savedCategoryService.avatar,
      active: savedCategoryService.active,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la categoría de servicio" });
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

async function getAllCategoryServices(req, res) {
  try {
    const categoryServices = await CategoryService.find();
    res.json(categoryServices);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los Categorías" });
  }
}

module.exports = {
  createCategoryService,
  deleteCategoryServiceById,
  getCategoryServiceById,
  updateCategoryServiceById,
  getAllCategoryServices,
};
