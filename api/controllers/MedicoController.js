/**
 * MedicoController
 *
 * @description :: Server-side logic for managing Medicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	Login: function(req, res) {
 		res.view('medico-login');
  	},
 	Registrar: function(req, res) {
	    var params = req.body;
	    Medico.create(params, function(err, createdData) {
	      if (err) { return res.badRequest({ error: err }) }
	      res.view('medico-panel', { medico: createdData });
	    });
  	},
  	Home: function(req, res) {
	    Medico.findOne({ cedula: req.body.cedula }).exec(function(err, doc) {
	      if (err) { return res.badRequest({ error: err }) }
	      Consulta.query(
	        'SELECT Paciente.Apellido, Paciente.Nombre' +
	        'From historia INNER JOIN medico on historia.Medico = medico.id' + //+ req.body.id +
	        'INNER JOIN paciente on paciente.id = historia.Paciente Where medico.id =' + req.body.id + ' AND historia.fecha =' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(),
	        function(err, rawResult) {
	          if (err) { return res.serverError(err); }
	          var pacientes = rawResult.json();
	          res.view('medico-panel', { doctor: doc, paciente: paciente });
	        });
	    })
	  },
	  
	  Consulta: function(req, res) {

	  }
};

