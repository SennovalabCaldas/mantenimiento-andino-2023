// clientController.js

const Supplier = require("../models/supplier");
const Address = require("../models/address");

// Crear un nuevo cliente
async function createSupplier(req, res) {
  try {
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
    await supplierStored.save();

    res.status(201).json({
      _id: supplierStored._id,
      supplierName: supplierStored.supplierName,
      avatar: supplierStored.avatar,
      active: supplierStored.active,
      direccion: supplierStored.direccion._id, // Devuelve el objeto de dirección completo
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
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      supplierData,
      {
        new: true,
      }
    );
    if (updatedSupplier) {
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ error: "Proveedor no encontrado" });
    }
  } catch (error) {
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
