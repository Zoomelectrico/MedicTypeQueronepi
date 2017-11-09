/**
 * Paciente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    connection: 'connection',
    tableName: 'Paciente',
    attributes: {
      id: {
        type: 'integer',
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        required: true
      },
      Nombre: {
        type: 'string',
      },
      Apellido: {
        type: 'string'
      },
      Cedula: {
        type: 'integer',
        unique: true
      },
      FNacimiento: {
        type: 'date'
      },
      Sexo: {
        type: 'char'
      },
      TSangre: {
        type: 'string'
      },
      Apto: {
        type: 'string'
      },
      Urbanizacion: {
        type: 'string'
      },
      Calle: {
        type: 'string'
      },
      Municipio: {
        type: 'string'
      }
    },
    migrate: 'safe',
    autoPK: true,
    autoCreatedAt: false,
    autoUpdatedAt: false
  }
};
