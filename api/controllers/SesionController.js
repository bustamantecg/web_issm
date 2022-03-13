/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  registro: async (peticion, respuesta) => {
    respuesta.view('pages/registro')
  },

  procesarRegistro: async (peticion, respuesta) => {
    let cliente = await Cliente.findOne({ email: peticion.body.email });
    if (cliente) {
      peticion.addFlash('mensaje', 'Email duplicado')
      return respuesta.redirect("/registro");
    }
    else {
      let cliente = await Cliente.create({
        email: peticion.body.email,
        nombre: peticion.body.nombre,
        contrasena: peticion.body.contrasena
      })
      peticion.session.cliente = cliente;
      peticion.addFlash('mensaje', 'Cliente registrado')
      return respuesta.redirect("/");
    }
  },

  inicioSesion: async (peticion, respuesta) => {
    respuesta.view('pages/inicio_sesion')
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let persona = await Persona.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena });
    if(!persona){

      peticion.addFlash('mensaje', 'Email o contraseña invalidos ' +peticion.body.email)
      return respuesta.redirect("/inicio-sesion");
    }
    if(!persona.activa){
      peticion.addFlash('mensaje', 'Usuario Inactivo. Comunicate con el Administrador del Sitio')
      return respuesta.redirect("/inicio-sesion");
    }

    if (persona) {
      
      //let carroCompra = await CarroCompra.find({cliente: cliente.id})
      //peticion.session.carroCompra = carroCompra
      if(persona.perfil <0){
        peticion.session.invitado = persona
          peticion.addFlash('mensaje', 'No es usuario de Sistema')
          return respuesta.redirect("/inicio-sesion");
      }else if(persona.perfil == 1){
        peticion.session.alumno = persona
        peticion.addFlash('mensaje', 'Sesion Alumno')
        return respuesta.redirect("/alumnos/alumno-principal");
      }else if(persona.perfil == 2){
        peticion.session.docente = persona
        peticion.addFlash('mensaje', 'Sesion Docente')
        return respuesta.redirect("/docentes/docente-principal");
      }else if(persona.perfil == 3){
        peticion.session.admin = persona
         peticion.addFlash('mensaje', 'Sesion Administrador')
         return respuesta.redirect("/admin/admin-principal");
      }
    }
  },

  adminPrincipal: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    //let fotos = await Foto.find().sort("id")
     respuesta.view('pages/admin/admin_principal')
  },

  adminCerrarSesion: async (peticion, respuesta) => {
    peticion.session.admin = undefined;
    peticion.addFlash('mensaje', 'Puedes ingresar cuando quieras')
    return respuesta.view("pages/sesion_finalizada");
  },

  docentePrincipal: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.docente) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    //let fotos = await Foto.find().sort("id")
     respuesta.view('pages/docentes/docente_principal')
  },

  docenteCerrarSesion: async (peticion, respuesta) => {
    peticion.session.docente = undefined;
    peticion.addFlash('mensaje', 'Puedes ingresar cuando quieras')
    return respuesta.view("pages/sesion_finalizada");
  },

  alumnoPrincipal: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.alumno) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    //let fotos = await Foto.find().sort("id")
     respuesta.view('pages/alumnos/alumno_principal')
  },

  alumnoCerrarSesion: async (peticion, respuesta) => {
    peticion.session.alumno = undefined;
    peticion.addFlash('mensaje', 'SPuedes ingresar cuando quieras')
    return respuesta.view("pages/sesion_finalizada");
  },


};

