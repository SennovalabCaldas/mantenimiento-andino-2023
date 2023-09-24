// clientController.js

const Supplier = require("../models/supplier");

// Crear un nuevo cliente
async function createSupplier(req, res) {
  const supplierData = req.body; // Obtiene los datos del suppliere incluyendo la dirección como objeto JSON
  console.log("supplierdata", supplierData);

  if (!req.files || !req.files.avatar) {
    return res.status(400).json({ msg: "Error al subir la imagen" });
  } else {
    const imagePath = req.files.avatar.path;
    console.log("imagePath", imagePath);
    supplierData.avatar = imagePath;
  }
  const supplierStored = new Supplier(supplierData);
  try {
    await supplierStored.save();

    res.status(201).json({
      _id: supplierStored._id,
      supplierName: supplierStored.supplierName,
      avatar: supplierStored.avatar,
      active: supplierStored.active,
      national: supplierStored.national,
    });

    console.log(supplierStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el proveedor" });
  }
}

// Obtener todos los clientes
async function getAllSuppliers(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los proveedores" });
  }
}

// Eliminar un cliente por ID
async function deleteSupplierById(req, res) {
  try {
    const { id } = req.params;
    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (deletedSupplier) {
      res.json({ message: "Proveedor eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Proveedor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Proveedor" });
  }
}

// Obtener un cliente por ID
async function getSupplierById(req, res) {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ error: "Proveedor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Proveedor" });
  }
}

// Actualizar un cliente por ID
async function updateSupplierById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const supplierData = req.body;
    console.log("supplierData", supplierData);

    // Verifica si el proveedor existe antes de intentar actualizarlo
    const existingSupplier = await Supplier.findById(id);
    console.log("existingSupplier", existingSupplier);
    if (!existingSupplier) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplierData, {
      new: true,
    });
    console.log("updatedSupplier", updatedSupplier);

    if (updatedSupplier) {
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ error: "Proveedor no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Proveedor" });
  }
}

module.exports = {
  createSupplier,
  getAllSuppliers,
  deleteSupplierById,
  getSupplierById,
  updateSupplierById,
};
