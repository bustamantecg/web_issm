const path = require('path')
const fs = require('fs');
let moment = require('moment');
const { Console } = require('console');

/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  adminRegistrarPersona: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    respuesta.view('pages/admin/registrar_persona')
  },

  procesarRegistrarPersona: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    let existeDni = await Persona.find({ dni: peticion.body.dni })
    if (existeDni.length > 0) {
      peticion.addFlash('mensaje', 'DNI duplicado')
      return respuesta.redirect('/admin-registrar-persona')
    }
    let existeEmail = await Persona.find({ email: peticion.body.email })
    if (existeEmail.length > 0) {
      peticion.addFlash('mensaje', 'Email Duplicado ' + peticion.body.email)
      return respuesta.redirect('/admin-registrar-persona')
    }
    let hoy = moment().format('YYYY-MM-DD');
    let persona = await Persona.create({
      dni: peticion.body.dni,
      apellido: peticion.body.apellido,
      nombre: peticion.body.nombre,
      sexo: peticion.body.sexo,
      domicilio: peticion.body.domicilio,
      celular: peticion.body.celular,
      email: peticion.body.email,
      fechanac: peticion.body.fechanac,
      alta: hoy,
      contrasena: peticion.body.dni,
      perfil: peticion.body.perfil,
      foto: peticion.body.foto
    }).fetch()
    peticion.file('foto').upload({}, async (error, archivos) => {
      if (archivos && archivos[0]) {
        let upload_path = archivos[0].fd
        let ext = path.extname(upload_path)

        await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/${persona.dni}${ext}`)))
        await Persona.update({ id: persona.id }, { foto: `${persona.dni}${ext}` })

      }
      peticion.addFlash('mensaje', 'Persona Registrada')
      return respuesta.redirect("/admin-registrar-persona")
    })

  },

  adminBuscarEditarPersona: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    respuesta.view('pages/admin/buscar_persona')
  },
  
  procesarBuscarEditarPersona: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }   
    let opcion = peticion.body.buscar
    if (opcion){
      if(opcion == 'dni'){
        let personas = await Persona.findOne({ dni: peticion.body.valor_Buscar })
        if (personas){          
          let fechaN = moment(personas.fechanac).format('YYYY-MM-DD');
          respuesta.view("pages/admin/editar_persona", {personas, fechaN})
        }else{
          peticion.addFlash('mensaje', 'NO Existe DNI '+peticion.body.valor_Buscar )
          return respuesta.redirect("/admin-buscar-editar-persona")        
        }

      }else if(opcion == 'email'){
        let personas = await Persona.findOne({ email: peticion.body.valor_Buscar })
        if (personas){          
          let fechaN = moment(personas.fechanac).format('YYYY-MM-DD');
          respuesta.view("pages/admin/editar_persona", {personas, fechaN})
        }else{
          peticion.addFlash('mensaje', 'NO Existe Email '+peticion.body.valor_Buscar )
          return respuesta.redirect("/admin-buscar-editar-persona")        
        }

      }else if (opcion == 'id'){ // por ID
        let personas = await Persona.findOne({ id: peticion.body.valor_Buscar })
        if (personas){          
          let fechaN = moment(personas.fechanac).format('YYYY-MM-DD');
          respuesta.view("pages/admin/editar_persona", {personas, fechaN})
        }else{
          peticion.addFlash('mensaje', 'NO Existe ID '+peticion.body.valor_Buscar )
          return respuesta.redirect("/admin-buscar-editar-persona")        
        }
      }
    }else{
      peticion.addFlash('mensaje', 'Dato a Buscar incorrecto')
      respuesta.view('pages/admin/buscar_persona')
    }      
  },

  procesarEditarPersona: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/inicio-sesion")
    }
    let buscar_dni = await Persona.findOne({dni:peticion.body.dni})// busco si no existe el nuevo dni
    if (buscar_dni){      
      if (buscar_dni.id != peticion.body.id){
        peticion.addFlash('mensaje', 'Ya existe una Persona con DNI '+peticion.body.dni)
        return respuesta.redirect("/admin-buscar-editar-persona")
      }
    }

    let buscar_email = await Persona.findOne({email:peticion.body.email})
    if (buscar_email){
      if(buscar_email.email != peticion.body.email){
        peticion.addFlash('mensaje', 'Ya existe una Persona con EMail '+peticion.body.email)
        return respuesta.redirect("/admin-buscar-editar-persona")
      }
    }

// validaciones correctas
  let actualizarPersona = await Persona.updateOne({ id: peticion.body.id})
  .set({
    dni: peticion.body.dni,
    apellido: peticion.body.apellido,
    nombre: peticion.body.nombre,
    sexo: peticion.body.sexo,
    domicilio: peticion.body.domicilio,
    celular: peticion.body.celular,
    email: peticion.body.email,
    fechanac: peticion.body.fechanac,      
    //contrasena: peticion.body.dni,
    perfil: peticion.body.perfil,
    foto: peticion.body.foto        
  });
  peticion.file('foto').upload({}, async (error, archivos) => {
    if (archivos && archivos[0]) {
      let upload_path = archivos[0].fd
      let ext = path.extname(upload_path)

      await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/${actualizarPersona.dni}${ext}`)))
      await Persona.update({ id: actualizarPersona.id }, { foto: `${actualizarPersona.dni}${ext}` })

    }
    peticion.addFlash('mensaje', 'Persona Registrada')
    return respuesta.redirect("/admin-buscar-editar-persona")
  })

  },

//  alumnos consulta

adminBuscarAlumno: async (peticion, respuesta) => {
  if (!peticion.session || !peticion.session.admin) {
    peticion.addFlash('mensaje', 'Sesión inválida')
    return respuesta.redirect("/inicio-sesion")
  }
  respuesta.view('pages/admin/admin_buscar_alumno')
},


procesarBuscarAlumno: async (peticion, respuesta) => {
  if (!peticion.session || !peticion.session.admin) {
    peticion.addFlash('mensaje', 'Sesión inválida')
    return respuesta.redirect("/inicio-sesion")
  }
  let opcion = peticion.body.buscar
  if (opcion){
    if(opcion == 'dni'){
      //if( typeof parseInt(peticion.body.valor_Buscar) === 'number'){        
      if(!isNaN(peticion.body.valor_Buscar)){  
        let personas = await Persona.findOne({ dni: peticion.body.valor_Buscar })
        if (personas){      
          if(personas.perfil != 1){
            peticion.addFlash('mensaje', 'NO es Alumno '+personas.apellido )          
            return respuesta.view('pages/admin/admin_buscar_alumno')
          }
          let fechaN = moment(personas.fechanac).format('YYYY-MM-DD');
          return respuesta.view("pages/admin/admin_consulta_alumno", {personas})
        }else{
          peticion.addFlash('mensaje', 'NO Existe DNI '+peticion.body.valor_Buscar )
          return respuesta.redirect("pages/admin/admin_buscar_alumno")        
        }  
      }else{
        peticion.addFlash('mensaje', 'Debe Ingresar un Número de D.N.I.')
        respuesta.view("pages/admin/admin_buscar_alumno") 
      }
    }else if(opcion == 'email'){
      if (typeof peticion.body.valor_Buscar === 'string'){            
        let personas = await Persona.findOne({ email: peticion.body.valor_Buscar })
        if (personas){   
          if(personas.perfil != 1){
            peticion.addFlash('mensaje', 'NO es Alumno '+personas.apellido+'  '+personas.email )
            return respuesta.view('pages/admin/admin_buscar_alumno')
          }
          let fechaN = moment(personas.fechanac).format('YYYY-MM-DD');     
          return respuesta.view("pages/admin/admin_consulta_alumno", {personas})
        }else{
          peticion.addFlash('mensaje', 'NO Existe Email '+peticion.body.valor_Buscar )
          return respuesta.view("pages/admin/admin_buscar_alumno")        
        }  
      }else{
        peticion.addFlash('mensaje', 'Debe Ingresar una dirección de Correo Electrónico ')
        respuesta.view("pages/admin/admin_buscar_alumno") 
      }
    }else if (opcion == 'id'){ // por ID
     // if( typeof parseInt(peticion.body.valor_Buscar) === 'number'){
      if(!isNaN(peticion.body.valor_Buscar)){ 
        let personas = await Persona.findOne({ id: peticion.body.valor_Buscar })
        if (personas){          
          if(personas.perfil != 1){
            peticion.addFlash('mensaje', 'NO es Alumno '+personas.apellido )
            return respuesta.view('pages/admin/admin_buscar_alumno')
          }
          let fechaN = moment(personas.fechanac).format('YYYY-MM-DD');        
          return respuesta.view("pages/admin/admin_consulta_alumno", {personas, fechaN})
        }else{
          peticion.addFlash('mensaje', 'NO Existe ID '+peticion.body.valor_Buscar )
          respuesta.view("pages/admin/admin_buscar_alumno")        
        }
      }else{
        peticion.addFlash('mensaje', 'Debe Ingresar un Número de ID ')
        respuesta.view("pages/admin/admin_buscar_alumno") 
      }

    }
   //***** realizar ls consultas de Carrera y las cuotas y cargar la vista*/   
  }else{
    peticion.addFlash('mensaje', 'Dato a Buscar incorrecto')
    respuesta.view('pages/admin/buscar_alumno')
  }        
},

adminCambiarClave: async (peticion, respuesta) => {
  if (!peticion.session || !peticion.session.admin) {
    peticion.addFlash('mensaje', 'Sesión inválida')
    return respuesta.redirect("/inicio-sesion")
  }
  respuesta.view('pages/admin/admin_cambiar_clave')
},

adminProcesarCambiarClave: async (peticion, respuesta) => {
  if (!peticion.session || !peticion.session.admin) {
    peticion.addFlash('mensaje', 'Sesión inválida')
    return respuesta.redirect("/inicio-sesion")
  }
  if (peticion.body.claveactual === peticion.session.admin.contrasena){
    if(peticion.body.clavenueva === peticion.body.clavenuevarepite){
      let actualizarClave = await Persona.updateOne({ id: peticion.session.admin.id})
      .set({
        contrasena: peticion.body.clavenueva,
      });
      peticion.session.admin.contrasena = peticion.body.clavenueva
      peticion.addFlash('mensaje', 'Su Nueva Clave Fue Actualizada')
      respuesta.view('pages/admin/admin_cambiar_clave')        
    }else{
      peticion.addFlash('mensaje', 'Su Nueva Clave No Coinciden')
      return respuesta.redirect('/admin-cambiar-clave')   
    }
  }else{
    peticion.addFlash('mensaje', 'Clave Actual Incorrecta')
    return respuesta.redirect('/admin-cambiar-clave')       
  }
},

resetarClaveAumno: async (peticion, respuesta) => {
  if (!peticion.session || !peticion.session.admin) {
    peticion.addFlash('mensaje', 'Sesión inválida')
    return respuesta.redirect("/inicio-sesion")
  }
  let personas = await Persona.findOne({ id: peticion.params.alumno_id})    

  let alumno = await Persona.updateOne({ id: peticion.params.alumno_id})
    .set({
          contrasena: personas.dni,
          activa: true
        });  
  peticion.addFlash('mensaje', 'Clave Reseteada Correctamente')  
  //respuesta.redirect("pages/admin/admin_consulta_alumno", {personas:personas})       
  //return respuesta.view("pages/admin/admin_consulta_alumno", {personas}) 
  //return respuesta.redirect("pages/admin/admin_consulta_alumno", {personas})
  respuesta.redirect('/admin-buscar-alumno')

},

};
