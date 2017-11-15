/**
 * Internista.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'connection',
	tableName: 'internista',
	attributes: {
		id:{
			type: 'int',
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},
		Condicion: {
			type: 'string'
		},
		informe_id: {
			type: 'int'
		}
	},
	migrate: 'safe',
  	autoPK: false,
  	autoCreatedAt: false,
 	autoUpdatedAt: false
};

