/**
 * MedicoController
 *
 * @description :: Server-side logic for managing Medicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  Registrar: function (req, res) {
    var params = req.body;
    Medico.create(params, function (err, createdData) {
      if (err) {
        return res.badRequest({ error: err });
      } else {
        res.view('medico-login');
      }
    });
  },

  BuscarPorCedula: function (req, res) {
    var doc;
    Medico.findOne({ Cedula: req.body.cedula }).exec(function (err, doctor) {
      if (err) { return res.badRequest({ error: err }) }
      doc = doctor;
      console.log(doc);
      Consulta.query(
        'SELECT paciente.id, paciente.Cedula, paciente.Nombre, paciente.Apellido  FROM consulta inner join paciente ' +
        'on paciente.id = consulta.Paciente inner join medico on medico.id = consulta.Medico ' +
        'where medico.id = ' + doc.id + ' group by paciente.id',
        function (err, rawResult) {
          if (err) { return res.serverError(err); }
          res.view('medico-panel', { medico: doc, pacientes: rawResult });
        })
      });
    },

    BuscarPorID: function (req, res) {
      var doc;
      Medico.findOne({ id: req.params.id }).exec(function (err, doctor) {
        if (err) { return res.badRequest({ error: err }) }
        doc = doctor;
        console.log(doc);
        Consulta.query(
          'SELECT paciente.id, paciente.Cedula, paciente.Nombre, paciente.Apellido  FROM consulta inner join paciente ' +
          'on paciente.id = consulta.Paciente inner join medico on medico.id = consulta.Medico ' +
          'where medico.id = ' + doc.id + ' group by paciente.id',
          function (err, rawResult) {
            if (err) { return res.serverError(err); }
            res.view('medico-panel', { medico: doc, pacientes: rawResult });
          })
        });
      },




      BuscarPacientes: function (req, res) {
        console.log(req.params.id);
        var doc = req.params.id;
        Consulta.query(
          'SELECT paciente.id, paciente.Cedula, paciente.Nombre, paciente.Apellido  FROM consulta inner join paciente ' +
          'on paciente.id = consulta.Paciente inner join medico on medico.id = consulta.Medico ' +
          'where medico.id = ' + doc + '',
          function (err, rawResult) {
            if (err) { return res.serverError(err); }
            res.view('medico-panel', { medico: doc, pacientes: rawResult });
          });
      }
};
