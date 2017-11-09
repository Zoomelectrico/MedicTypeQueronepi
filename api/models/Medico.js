/**
 * Medico.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'int'
    },
    Cedula: {
      type: 'int'
    },
    CDM: {
      type: 'int'
    },
    Nombre: {
      type: 'string'
    },
    Apellido: {
      type: 'string'
    },
    Especialidad:{
      type: 'string'
    }
    
  }
};

