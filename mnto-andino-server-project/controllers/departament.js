const Department = require("../models/department");

async function createDepartments(req, res) {
  const { departmentNames } = req.body;
  
  try {
    const newDepartments = await Department.create(
      departmentNames.departmentNames.map((name) => ({ departmentName: name }))
    );

    res.status(201).json(newDepartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear los departamentos." });
  }
}

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los departamentos." });
  }
}

async function deleteDepartments(req, res) {
  const { departmentIds } = req.body;

  try {
    const deletedDepartments = await Department.deleteMany({
      _id: { $in: departmentIds }
    });

    if (deletedDepartments.deletedCount > 0) {
      res.status(200).json({ message: "Departamentos eliminados exitosamente." });
    } else {
      res.status(404).json({ message: "Ningún departamento encontrado para eliminar." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar los departamentos." });
  }
}

module.exports = {
  createDepartments,
  deleteDepartments,
  getAllDepartments,
};
