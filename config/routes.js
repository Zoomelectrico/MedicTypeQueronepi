
module.exports.routes = {
  '/': {
    view: 'homepage'
  },
  'GET /Medico/Login': {view: 'medico-login'},
  'GET /Medico/Registro': {view: 'medico-registro'},
  'POST /Medico/Registrado': 'MedicoController.Registrar',
  'POST /Medico/Home':'MedicoController.Login',

  'GET /Paciente/Registro': {view:'paciente-registro'},
  'POST /Paciente/Registro': 'PacienteController.Crear'
  'GET /Paciente/login': {view: 'paciente-login'},
  'GET /Paciente/Modificar': 'PacienteController.Modificar',
  // 'POST /Paciente/Informes': PacienteController.Informes,
  'POST /Paciente/Modificar': 'PacienteController.Update'
};