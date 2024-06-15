const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const empleadoSchema = require('../models/empleado');

// Crear empleado
router.post('/empleado', async (req, res) => {
  try {
    const empleado = new empleadoSchema(req.body);
    const savedEmpleado = await empleado.save();
    res.json(savedEmpleado);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Obtener todos los empleados
router.get('/empleado', async (req, res) => {
  try {
    const empleados = await empleadoSchema.find();
    res.json(empleados);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Eliminar empleado por ID
router.delete('/empleado/:id', async (req, res) => {
  try {
    // Limpiar el ID de espacios en blanco y caracteres no válidos
    const id = req.params.id.trim().split(' ')[0];

    // Verificación del formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de empleado inválido' });
    }

    const deletedEmpleado = await empleadoSchema.findByIdAndDelete(id);
    if (!deletedEmpleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado con éxito', data: deletedEmpleado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
