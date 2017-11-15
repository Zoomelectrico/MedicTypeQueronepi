/**
 * PatologiaController
 *
 * @description :: Server-side logic for managing Patologias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    intervaloPatologiasDiagnosticadas: function (req, res) {
        console.log(req.params.fecha1); 
        console.log(req.params.fecha2);
        Consulta.query(
        'select Consulta.fecha, patologia.nombre, COUNT(patologia.nombre)  from Consulta' +
       ' INNER JOIN patologias_informe on Consulta.id = patologias_informe.informe ' +
       ' INNER JOIN patologia on patologias_informe.patologia = patologia.id ' +
       "WHERE FECHA BETWEEN '" + req.params.fecha1 + "' AND '" + req.params.fecha2 + "'" +
        "GROUP BY patologia.nombre;" ,
        function (err, rawResult) {
            if (err) {return res.serverError(err);}
            res.view('patologia-mostrar', {patologias: rawResult }); 

        }); 
    }



      
};

