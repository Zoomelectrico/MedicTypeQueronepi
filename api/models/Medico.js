/**
 * Medico.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'connection',
    tableName: 'medico',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      required: true
    },
    Cedula: {
      type: 'integer',
      unique : true, 
    },
    CDM: {
      type: 'integer',
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
  },
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false
  };

