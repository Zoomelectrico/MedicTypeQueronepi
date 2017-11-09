/**
 * Medico.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      required: true
    },
    Cedula: {
      type: 'int',
      unique : true, 
    },
    CDM: {
      type: 'int',
      unique: true, 
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

