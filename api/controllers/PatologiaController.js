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
    }



/*
    intervaloPatologiasNoDiagnosticadas: function (req, res) {
        console.log(req.params.fecha1); 
        console.log(req.params.fecha2);
        Consulta.query(
        'select Consulta.fecha, patologia.nombre, COUNT(patologia.nombre) as vecesDiagnosticada from Consulta' +
       ' INNER JOIN patologias_informe on Consulta.id = patologias_informe.informe ' +
       ' INNER JOIN patologia on patologias_informe.patologia = patologia.id ' +
          "WHERE Fecha != '" + req.params.fecha1 + "' AND '" + req.params.fecha2 + "'" + "Fecha IS NULL" +
        "GROUP BY patologia.nombre;" ,
        function (err, rawResult) {
            if (err) {return res.serverError(err);}
            res.view('patologia-mostrar', {patologias: rawResult }); 

        }); 
    }
*/

      
};

