/**
 * Patologias_informeController
 *
 * @description :: Server-side logic for managing patologias_informes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    Crear: function (req, res, next, callback) {
        var body = req.body; 

        Patologias_informe.create(body, function (err, createdData) {
            if (err) {return res.badRequest({ error: err });}
            else {
                console.log(createdData); 
            }

        })
    }

};

