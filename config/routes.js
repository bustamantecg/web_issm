/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

   'GET /': 'PrincipalController.inicio',

  '/acerca-de': {
    view: 'pages/acerca_de'
  },

  'GET /inicio-sesion': 'SesionController.inicioSesion', 

  'POST /procesar-inicio-sesion': 'SesionController.procesarInicioSesion',

  //**************** Administrador  ****************************************/

  'GET /admin/admin-principal': 'SesionController.adminPrincipal',

  'GET /cerrar-sesion-admin': 'SesionController.adminCerrarSesion',

  'GET /admin-cambiar-clave':'AdminController.adminCambiarClave',

  'POST /procesar-cambiar-clave':'AdminController.adminProcesarCambiarClave',

  'GET /admin-registrar-persona':'AdminController.adminRegistrarPersona',
  
  'POST /procesar-registrar-persona': 'AdminController.procesarRegistrarPersona',  
  
  'GET /admin-buscar-editar-persona': 'AdminController.adminBuscarEditarPersona',

  'POST /procesar-buscar-editar-persona': 'AdminController.procesarBuscarEditarPersona',

  'POST /procesar-editar-persona/:persona_id': 'AdminController.procesarEditarPersona',

  'GET /admin-buscar-alumno': 'AdminController.adminBuscarAlumno', // llama a la vebtana para caragar dni del alumno

  'POST /procesar-buscar-alumno': 'AdminController.procesarBuscarAlumno',
      
  'GET /resetear-clave/:alumno_id': 'AdminController.resetarClaveAumno',
  
  //'GET /recargar-Consulta-Alumno/:alumno_id':'AdminController.recargarConsultaAlumno',
 'GET pages/admin/admin_consulta_alumno': { view: 'pages/admin/admin_consulta_alumno'},


  //**************** Docente  **********************************************/
  'GET /docentes/docente-principal': 'SesionController.docentePrincipal',

  'GET /cerrar-sesion-docente': 'SesionController.docenteCerrarSesion',
  
  //**************** Alumnos  ***********************************************/
  'GET /alumnos/alumno-principal': 'SesionController.alumnoPrincipal',

  'GET /cerrar-sesion-alumno': 'SesionController.alumnoCerrarSesion',

  
   
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

};
