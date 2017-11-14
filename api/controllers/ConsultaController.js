/**
 * ConsultaController
 *
 * @description :: Server-side logic for managing Consultas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	Crear: function(req, res, next, callback) {
	    
	    var params = req.body;
	    Consulta.create(params, function(err, createdData) {
	      if (err) {
	        return res.badRequest({error: err});
	      } else {
	        res.view('medico-historia-medica', {medico: med, consulta:createdData}); 
	      }
	    });
    },

    Agendar: function(req, res){
    	console.log(req.params);
	    var med;
	    Medico.findOne({id:req.params.idMedico}).exec(function(err, medico){
	    	if(err){
	    		return res.badRequest({error: err});
	    	}else{
	    		console.log(medico);
	    		med = medico;
	    		res.view('medico-agenda', {medico:med});
	    	};
	    });
    },

	Buscar: function(req, res, next, callback) {
	    var consulta = req.body;
	    Consutla.findOne(consulta, function(err, createdData){
	      if (err) {
	        return res.badRequest({error: err});
	      } else {
	        res.view('medico-historia-medica', {Consulta:createdData});
	      }
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
		Medico.findOne({id:req.params.idMedico}).exec(function (err, medico){
			if (err) {
        		return res.badRequest({ error: err });
      	} else{
				console.log(medico);
				doc = medico;
			};
		});
		Paciente.findOne({id:req.params.idPaciente}).exec(function (err, paci){
			if (err) {
        return res.badRequest({ error: err });
      } else{
				console.log(paci);
				paciente = paci;
				res.view('medico-consulta', {medico: doc, paciente: paciente});
			};
		});
		
	
	}

};

