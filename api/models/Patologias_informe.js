/**
 * Patologias_informe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'connection',
  tableName: 'patologias_informe',
  attributes: {

    informe: {
      type: 'int'
    },

    patologia:  {
      type: 'int'
    }, 

  },
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false
  
};

