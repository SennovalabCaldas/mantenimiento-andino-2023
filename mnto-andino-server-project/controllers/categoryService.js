const CategoryService = require("../models/categoryService");

async function createCategoryService(req, res) {
  try {
    const categoryServiceData = req.body; // Obtiene los datos de la categoría de servicio desde el cuerpo de la solicitud
    console.log("categoryServiceData", categoryServiceData);

    if (!req.file) {
      return res.status(400).json({ msg: "Error: Debes subir una imagen." });
    }

    const imagePath = req.file.path;
    console.log("imagePath", imagePath);
    categoryServiceData.avatar = imagePath; // Establece la ruta de la imagen en los datos de la categoría de servicio

    const categoryServiceStored = new CategoryService(categoryServiceData); // Crea una nueva instancia del modelo de la categoría de servicio
    await categoryServiceStored.save(); // Guarda la categoría de servicio en la base de datos

    res.status(201).json({
      _id: categoryServiceStored._id,
      nameCategoryService: categoryServiceStored.nameCategoryService,
      descriptionCategoryService:
        categoryServiceStored.descriptionCategoryService,
      avatar: categoryServiceStored.avatar,
      active: categoryServiceStored.active, // Asegúrate de usar 'active' en lugar de 'ative' para evitar errores tipográficos
    });

    console.log(categoryServiceStored);
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
  getAllCategoryServices
};
