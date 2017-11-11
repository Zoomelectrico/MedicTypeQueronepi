/**
 * Consulta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'connection',
	tableName: 'historia',
  attributes: {
    id: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    Tipo: {
        type: 'string'
    },
    Precio: {
        type: 'float'
    },
    Fecha: {
        type: 'date'
    },
    Talla: {
        type: 'float'
    }, 
    Peso: {
        type: 'float'
    },
    FCardiaca:{
        type: 'int'
    },
    Tension: {
        type: 'string'
    },
    FRespiratoria: {
        type: 'int'
    },
    Temperatura: {
        type: 'float'
    },
    Medico: {
        type: 'int',
    },
    paciente: {
        type: 'int', 
    }
  },
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false
};

