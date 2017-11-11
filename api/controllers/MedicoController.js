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
        var hoy = new Date();
        var dateAnio =  hoy.getUTCFullYear();
        var dateMes = hoy.getUTCMonth();
        var dateDia = hoy.getUTCDate();
      Consulta.query(
        'SELECT paciente.Apellido, paciente.Nombre FROM consulta INNER JOIN medico on consulta.Medico = medico.id INNER JOIN paciente ON paciente.id = consulta.Paciente WHERE medico.id = '+ doc.id +' AND consulta.Fecha = ' + '\'' + dateAnio + '-' + dateMes + '-' + dateDia + '\'',// + '\'' + dateAnio + '-' + dateMes + '-' + dateDia + '\'' +\'2017-07-07\',
        function(err, rawResult) {
          if (err) { return res.serverError(err); }
          res.view('medico-panel', { medico: doc, pacientes: rawResult});
        })
    });
  }
};
