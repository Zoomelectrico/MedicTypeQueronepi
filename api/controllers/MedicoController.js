/**
 * MedicoController
 *
 * @description :: Server-side logic for managing Medicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  Registrar: function(req, res) {
    var params = req.body;
    Medico.create(params, function(err, createdData) {
      if (err) { return res.badRequest({ error: err }) }
      res.view('medico-panel', { medico: createdData });
    });
  },
  Login: function(req, res) {
    Medico.findOne({ Cedula: req.body.cedula }).exec(function(err, doc) {
      if (err) { return res.badRequest({ error: err }) }
      Consulta.query(
        'SELECT Paciente.Apellido, Paciente.Nombre' +
        'From historia INNER JOIN medico on historia.Medico = medico.id' + ' ' +
        'INNER JOIN paciente on paciente.id = historia.Paciente Where medico.id =' + doc.id + ' AND historia.fecha = ' + '\'' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()+ '\'',
        function(err, rawResult) {
          if (err) { return res.serverError(err); }
          var pacientes = rawResult.json();
          res.view('medico-panel', { doctor: doc, pacientes: pacientes });
        })
    });
  }
};
