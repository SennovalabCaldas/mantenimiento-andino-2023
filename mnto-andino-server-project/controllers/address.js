const address = require("../models/address");
const mongoose = require("mongoose");
// Método para crear una nueva dirección
const createAddress = async (req, res) => {
  try {
    const addressData = req.body;
    console.log(addressData);
    const newAddress = new address(addressData);
    const savedAddress = await newAddress.save();
    console.log(savedAddress);
    res.status(201).json(savedAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la dirección", error });
  }
};

// Método para obtener todas las direcciones
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las direcciones", error });
  }
};

// Método para actualizar una dirección por id

const getAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;

    const foundAddress = await address.findById(addressId);

    if (!foundAddress) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    res.status(200).json(foundAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la dirección", error });
  }
};
const updateAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const addressDataToUpdate = req.body;

    const updatedAddress = await address.findByIdAndUpdate(
      addressId,
      addressDataToUpdate,
      { new: true } // Para obtener la dirección actualizada
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la dirección", error });
  }
};
// Método para eliminar una dirección por su ID
const deleteAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;

    const deletedAddress = await address.findByIdAndRemove(addressId);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    res.status(200).json({ message: "Dirección eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la dirección", error });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  updateAddressById,
  getAddressById,
  deleteAddressById,
};