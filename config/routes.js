
module.exports.routes = {
  '/': {
    view: 'homepage'
  },
  //'GET /Medico/Agenda': {view: 'medico-agenda'},
  'GET /Medico/Agenda/:idMedico': 'ConsultaController.Agendar',  
  'GET /Medico/Login': {view: 'medico-login'},
  'GET /Medico/Registro': {view: 'medico-registro'},
  'POST /Medico/Registrado': 'MedicoController.Registrar',
  'POST /Medico/BuscarPorCedula':'MedicoController.BuscarPorCedula',
  'POST /Medico/BuscarPorID/:id':'MedicoController.BuscarPorID',

  'GET /Paciente/Registro/:id': {view:'paciente-registro'},
  'POST /Paciente/Registro/:id': 'PacienteController.Crear',
  'GET /Paciente/Login': {view: 'paciente-login'},
  'GET /Paciente/Modificar': 'PacienteController.Modificar',
  // 'POST /Paciente/Informes': PacienteController.Informes,
  'POST /Paciente/Modificar': 'PacienteController.Modificar',
  'POST /Paciente/Update/:id': 'PacienteController.Update',
  
  'POST /Consulta/Crear/:idMedico/:idPaciente': 'ConsultaController.Crear',

  'GET /Medico/Consulta/:idMedico/:idPaciente': 'ConsultaController.BuscarModificar',//{view: 'medico-consulta'},
  
  'POST /Consulta/Modificar': 'ConsultaController.Modificar',


  'GET /Patologia/fecha': {view: 'patologia-fecha'},
  'GET /Patologia/fecha2': {view: 'patologia-fecha2'}, 
  'POST /Patologia/enviarFecha': 'PatologiaController.intervaloPatologiasDiagnosticadas', 
  'GET /Patologia/chang': {view: 'patologia-mostrar'},
  'POST /Patologia/enviarFechaNoDiag' : 'PatologiaController.intervaloPatologiasNoDiagnosticadas'
};
