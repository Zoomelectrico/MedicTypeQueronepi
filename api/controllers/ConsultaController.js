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
				if(req.body.antecedente != null && req.body.antecedente != ''){
					Antecedente.create({Consulta: consulta.id, Antecedente: req.body.antecedente}, function(err, createdData){
						if(err){
							return res.badRequest({ error:err });
						} else {
							console.log(createdData);
						}
					});
				}
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
				Patologia.findOne({ Nombre: req.body.patologia}).exec(function (err, patologia) { 
					if (err) { return res.badRequest({error: err});
				} else {
					Medicamento.findOne({ Nombre: req.body.medicamento}).exec(function (err, medicamento) { 
						if (err) { return res.badRequest({error: err});
					} else {

				console.log(patologia);
				console.log(medicamento);
				
				

				Patologias_informe.create({informe: consulta.id, patologia: patologia.id}, function (err, createdData) {
					if (err) { return res.badRequest({error: err})};
				});
				Medicamentos_preescritos.create({ medicamento: medicamento.id, informe: consulta.id}, function (err, createdData) {
					if (err) { return res.badRequest({error: err})};
				})
				res.redirect('/Medico/BuscarPorID/'+req.params.idMedico)
				
				
			
			
				
			}
		});
		
	}
}); 
			}

		}); 
	}

,

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
		Medico.findOne({id: req.params.idMedico}).exec(function(err,Medico){
			if (err) { return res.badRequest({ error: err }) }
				Paciente.findOne({id: req.params.idPaciente}).exec(function(err, Paciente){
					if (err) { return res.badRequest({ error: err }) }
				    Consulta.query(
					'SELECT consulta.* FROM consulta INNER JOIN paciente ON consulta.Paciente = paciente.id' +
					' INNER JOIN medico ON consulta.Medico = medico.id '+
					'WHERE medico.id = ' + req.params.idMedico + 
					' AND paciente.id = ' + req.params.idPaciente + ' group by consulta.id',
					function(err, rawResult){
						if(err){
							return res.serverError(err);
						} else {
							var consultaResult = rawResult;
							console.log(consultaResult);
							Cirujano.query(
								'SELECT * FROM cirujano',
								function(err, rawResult){
									if(err){
										return res.serverError(err);
									} else{
										var cirujanoRes = rawResult;
										Nutricionista.query(
											'SELECT * FROM nutricionista',
											function(err, rawResult){
												if(err){
													return res.serverError(err);
												} else {
													var nutriRes = rawResult;
													Internista.query(
														'SELECT * FROM internista',
														function(err, rawResult){
															if(err){
																return res.serverError(err);
															} else {
																var interRes = rawResult;
																Patologia.query(
																	'SELECT patoI.*, patologia.Nombre FROM patologias_informe as patoI INNER JOIN patologia ON patologia.id = patoI.Patologia',
																	function(err,rawResult){
																		if(err){return res.serverError(err);}
																		else{
																			var respuesta = rawResult
																			Medicamento.query(
																				'SELECT mediI.*, medicamento.Nombre FROM medicamentos_preescritos as mediI INNER JOIN medicamento ON mediI.medicamento = medicamento.id',
																				function(err,rawResult){
																					if(err){return res.serverError(err);}
																					else{
																						var medi = rawResult;
																						Antecedente.query(
																							'SELECT antecedentes.*, paciente.Nombre FROM antecedentes INNER JOIN consulta ON antecedentes.Consulta = consulta.id '+
																							'INNER JOIN medico ON consulta.Medico = medico.id INNER JOIN paciente ON paciente.id = consulta.Paciente WHERE medico.id = '+ req.params.idMedico  
																							+ ' AND paciente = '+ req.params.idPaciente + ' GROUP BY paciente.id',
																							function(err, rawResult){
																								if(err){return res.serverError(err);}
																								else{
																									var antecedente = rawResult;
																									res.view('medico-historia-medica', {medico: Medico, paciente: Paciente, consultas: consultaResult, patologias: respuesta, medicamentos: medi, cirujanos: cirujanoRes, internistas: interRes, nutricionistas: nutriRes, antecedentes: antecedente});
																								}
																							}
																							)
																						
																					}
																				}
																			)
																		}
																	}
																)
															}
															
														})
													
												}
												
											})
										
									}
									
								})
							
						}
					})
				});
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
		console.log("PARAMS: ====================");
		console.log(req.params);
		console.log("BODY: ===================")
		console.log(req.body);
		var doc;
		var paciente;
	
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
				Patologia.find().exec(function (err, patologias) { 
					if (err) { return res.badRequest({error: err});
				} else {
					Medicamento.find().exec(function (err, medicamentos) { 
						if (err) { return res.badRequest({error: err});
					} else {
					console.log (patologias);
					console.log (medicamentos); 
				
					
				res.view('medico-consulta', { medico: doc, paciente: paciente, patologias, medicamentos });
			};
		});

	}
	});
			}
});
			}
}
		
	
