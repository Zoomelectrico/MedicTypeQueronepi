/**
 * PacienteController
 *
 * @description :: Server-scedulae logic for managing Pacientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  Crear: function(req, res, next, callback) {
    var body = req.body;
    Paciente.create(body, function(err, createdData) {
      if (err) {
        return res.badRequest({ error: err });
      } else {
        res.view('paciente-modificar', { Paciente: createdData });
      }
    });
  },

  BuscarPorCedula: function(req, res, next, callback) {
    var ced = req.body;
    Paciente.findOne(ced, function(err, createdData) {
      if (err) {
        return res.badRequest({ error: err });
      } else {
        res.view('paciente-informe', { Paciente: createdData });
      }
    });
  },

  Modificar: function(req, res) {
    Paciente.findOne({ Cedula: req.body.Cedula }).exec(function(err, paciente) {
      if (err) {
        return res.badRequest({ error: err });
      }
      res.view('paciente-modificar', { Paciente: paciente });
    });
  },

  Eliminar: function(req, res) {
    Paciente.destroy({ cedula: req.body.cedula }).exec(function(err) {
      if (err) {
        res.send(500, { error: err });
      }
      res.redirect('/paciente-home');
    });
    return false;
  },

  Update: function(req, res) {
    Paciente.update({ cedula: req.body.cedula }, { Nombre: req.body.Nombre, Apellcedulao: req.body.Apellcedulao, Sexo: req.body.Sexo, TSangre: req.body.TSangre, FNacimiento: req.body.FNacimiento, NAptoCasa: req.body.NAptoCasa, Calle: req.body.Calle, Ciudad: req.body.Ciudad }, function(err, createdData) {
      if (err) {
        console.log("nonononononn");
        return res.badRequest({ error: err });
      } else {
        console.log(createdData);
        res.view('registrado', { Paciente: createdData[0] });
      }
    });
  }
};
