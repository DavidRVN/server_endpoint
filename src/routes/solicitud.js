const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const solicitudSchema = require('../models/solicitud');

// Crear solicitud
router.post('/solicitud', async (req, res) => {
  try {
    const solicitud = new solicitudSchema(req.body);
    const savedSolicitud = await solicitud.save();
    res.json(savedSolicitud);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Obtener todas las solicitudes
router.get('/solicitud', async (req, res) => {
  try {
    const solicitudes = await solicitudSchema.find().populate('id_empleado');
    res.json(solicitudes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Obtener solicitud por ID
router.get('/solicitud/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await solicitudSchema.findById(id).populate('id_empleado');
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.json(solicitud);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Actualizar solicitud por ID
router.put('/solicitud/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSolicitud = await solicitudSchema.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSolicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.json(updatedSolicitud);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Eliminar solicitud por ID
router.delete('/solicitud/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificación del formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de solicitud inválido' });
    }

    const deletedSolicitud = await solicitudSchema.findByIdAndDelete(id);
    if (!deletedSolicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.json({ message: 'Solicitud eliminada con éxito', data: deletedSolicitud });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
