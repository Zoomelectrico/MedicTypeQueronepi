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
	        res.view('medico-consulta', {Consulta:createdData}); 
	      }
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
 	}

};

