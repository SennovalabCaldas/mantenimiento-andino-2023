// clientController.js

const Client = require("../models/client");
const Address = require("../models/address");

// Crear un nuevo cliente
async function createClient(req, res) {
  try {
    const { direccion, ...clientData } = req.body;
    console.log(direccion);
    console.log(clientData);
    console.log(req.files.avatar);
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      console.log("Archivo que llega", req.files.avatar);
      const imagePath = req.files.avatar.path; // Usar la propiedad 'path' para obtener la ruta del archivo
      console.log("imagePath", imagePath);
      clientData.avatar = imagePath;
    }

    const newAddress = new Address(direccion);
    const addressSaved = await newAddress.save();

    const clientStored = new Client(clientData);
    await clientStored.save();
    res.status(201).json({
      _id: clientStored._id,
      clientName: clientStored.clientName,
      avatar: clientStored.avatar,
      joinDate: clientStored.joinDate,
      active: clientStored.active,
      direccion: addressSaved._id,
    });
    console.log(clientStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la publicación" });
  }
}

// Obtener todos los clientes
async function getAllClients(req, res) {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
}

// Eliminar un cliente por ID
async function deleteClientById(req, res) {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (deletedClient) {
      res.json({ message: "Cliente eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
}

// Obtener un cliente por ID
async function getClientById(req, res) {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
}

// Actualizar un cliente por ID
async function updateClientById(req, res) {
  try {
    const { id } = req.params;
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el cliente actualizado en la respuesta
    });

    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
}

module.exports = {
  createClient,
  getAllClients,
  deleteClientById,
  getClientById,
  updateClientById,
};
