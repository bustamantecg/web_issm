/**
 * Persona.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

  tableName: "persona",
    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
      dni: { type: 'string' },
  
      apellido: { type: 'string' },

      nombre: { type: 'string' },

      sexo: { type: 'string' },

      domicilio: { type: 'string' },

      celular: { type: 'string' },

      email: { 
        type: 'string', 
        unique: true, 
        isEmail:true,        
        required: true      
      },

      fechanac: { type: 'ref', columnType: 'date' },

      alta: { type: 'ref', columnType: 'date' },

      perfil :{ type: 'number' }, // -1: No definido, 1:Alumno, 2:Docente, 3: Admin, 51:SuperUser
        
      activa: { type: 'boolean' },

      contrasena: { type: 'string' },

      foto: { type: 'string' }
  
      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  
  
      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  
    },
  
  };
  
  