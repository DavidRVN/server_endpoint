const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  fecha_ingreso: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  salario: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Empleado', empleadoSchema);
