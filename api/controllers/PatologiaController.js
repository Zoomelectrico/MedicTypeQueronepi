/**
 * PatologiaController
 *
 * @description :: Server-side logic for managing Patologias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

    intervaloPatologiasDiagnosticadas: function (req, res) {
        console.log(req.body); 
       Query =  'select Consulta.fecha, patologia.nombre, COUNT(patologia.nombre) as vecesDiagnosticada' +
       ', count(patologia.nombre) * 100 / (select count(*) from patologias_informe ' + 
       'INNER JOIN patologia on patologia.id = patologias_informe.patologia ' +  
       'WHERE Fecha BETWEEN ' + "'" + req.body.fecha1 + "' AND '" + req.body.fecha2 + "' ) " + ' as porcentaje ' +
        'from Consulta' +
       ' INNER JOIN patologias_informe on Consulta.id = patologias_informe.informe ' +
       ' INNER JOIN patologia on patologias_informe.patologia = patologia.id ' +
       "WHERE FECHA BETWEEN '" + req.body.fecha1 + "' AND '" + req.body.fecha2 + "'" +
        "GROUP BY patologia.nombre;";
        
        console.log(Query); 
        
        

        Consulta.query(
        Query ,
        function (err, rawResult) {
            console.log(rawResult); 
            if (err) {return res.serverError(err);}
            patologias = rawResult; 
            
            
           


            res.view('patologia-mostrar', {patologias}); 
        });
    },




    intervaloPatologiasNoDiagnosticadas: function (req, res) {
        console.log(req.body.fecha1); 
        console.log(req.body.fecha2);
        Query =  "SELECT patologia.* from patologias_informe " +
        " RIGHT OUTER JOIN  patologia ON patologias_informe.patologia = patologia.id " +
        "LEFT OUTER JOIN consulta ON patologias_informe.informe = consulta.id " +
        " WHERE Fecha is NULL OR Nombre NOT IN ( " +
        " select patologia.nombre from patologias_informe " +
        " RIGHT OUTER JOIN  patologia ON patologias_informe.patologia = patologia.id " +
        " LEFT OUTER JOIN consulta ON patologias_informe.informe = consulta.id " +
        " WHERE Fecha BETWEEN '" + req.body.fecha1+ "' AND '" + req.body.fecha2 + "'); ";
         console.log(Query); 
        Consulta.query(
         Query,
        function (err, rawResult) {
            console.log(rawResult); 
            if (err) {return res.serverError(err);}
            res.view('patologia-mostrarNoDiag', {patologias: rawResult }); 

        }); 
    }


      
};

