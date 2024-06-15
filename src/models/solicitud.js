const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  resumen: {
    type: String,
    required: true
  },
  id_empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado', // Referencia al modelo Empleado
    required: true
  }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
