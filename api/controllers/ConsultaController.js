/**
 * ConsultaController
 *
 * @description :: Server-side logic for managing Consultas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	Crear: function (req, res, next, callback) {
		console.log(req.body);
		console.log(req.params.idMedico);
		console.log(req.params.idPaciente);
		var hoy = new Date();
		var dateAnio = hoy.getFullYear();
		var dateMes = hoy.getMonth() + 1;
		var dateDia = hoy.getDate();
		var fecha = '\'' + dateAnio + '-' + dateMes + '-' + dateDia + '\'';

		Consulta.create({ Peso: req.body.Peso, Talla: req.body.Talla, Tension: req.body.Tension, 
			Temperatura: req.body.Temperatura, FRespiratoria: req.body.FRespiratoria, 
			FCardiaca: req.body.FCardiaca, Medico: req.params.idMedico, 
			Paciente: req.params.idPaciente, Fecha: fecha }, function (err, createdData) {
			if (err) {
				return res.badRequest({ error: err });
			} else {
				console.log(createdData);
				var consulta = createdData;
				if((req.body.motivo != null && req.body.motivo != '') || (req.body.organo != null && req.body.organo != '')){
					Cirujano.create({motivo_Operacion: req.body.motivo, Organo: req.body.organo, informe_id: consulta.id}, function(err, createdData){
						if(err){
							return res.badRequest({ error:err });
						} else {
							console.log(createdData);
						}
					});
				}
				if(req.body.condicion != null && req.body.condicion != ''){
					Internista.create({Condicion: req.body.condicion, informe_id: consulta.id}, function(err, createdData){
						if(err){
							return res.badRequest({ error:err });
						} else {
							console.log(createdData);
						}
					});
				}
				if(req.body.dieta != null && req.body.dieta != ''){
					Nutricionista.create({Dieta: req.body.dieta, informe_id: consulta.id}, function(err, createdData){
						if(err){
							return res.badRequest({ error:err });
						} else {
							console.log(createdData);
						}
					});
				}
				res.redirect('/Medico/BuscarPorID/'+req.params.idMedico);
			}
		});
		
	},

	Agendar: function (req, res) {
		console.log(req.params);
		var med;
		Medico.findOne({ id: req.params.idMedico }).exec(function (err, medico) {
			if (err) {
				return res.badRequest({ error: err });
			} else {
				console.log(medico);
				med = medico;
				res.view('medico-agenda', { medico: med });
			};
		});
	},

	Buscar: function (req, res) {
		Paciente.findOne({id: req.params.idPaciente}).exec(function(err, Paciente){
			if (err) { return res.badRequest({ error: err }) }
		    Consulta.query(
			'SELECT * FROM consulta INNER JOIN Paciente ON consulta.Paciente = paciente.id ' +
			'INNER JOIN medico ON consulta.Medico = medico.id WHERE medico.id = ' + req.params.idMedico + 
			' AND paciente.id = ' + req.params.idPaciente + ' group by consulta.id',
			function(err, rawResult){
				if(err){
					return res.serverError(err);
				} else {
					res.view('medico-historia-medica', { paciente: Paciente, consultas: rawResult });
				}
			})
		});
		
	},

	Modificar: function (req, res) {
		Consulta.findOne({ Cedula: req.body.cedula }).exec(function (err, consulta) {
			if (err) {
				return res.badRequest({ error: err });
			}
			console.log(consulta);
			res.view('medico-consulta', { Consulta: consulta });
		});
	},

	BuscarModificar: function (req, res) {
		console.log(req.params);
		var doc;
		var paciente;
		var patologias; 
		Patologia.find().exec(function (err,patologia) {
			if (err) {
				return res.badRequest({error: err});
			}
			else {
				console.log(patologia); 
				patologias = patologia; 
			}
		})
		Medico.findOne({ id: req.params.idMedico }).exec(function (err, medico) {
			if (err) {
				return res.badRequest({ error: err });
			} else {
				console.log(medico);
				doc = medico;
			};
		});
		Paciente.findOne({ id: req.params.idPaciente }).exec(function (err, paci) {
			if (err) {
				return res.badRequest({ error: err });
			} else {
				console.log(paci);
				paciente = paci;
				res.view('medico-consulta', { medico: doc, paciente: paciente,patologias: patologias });
			};
		});


	}

};

