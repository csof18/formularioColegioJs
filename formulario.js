//VARIABLES GLOBALES
//formulario colegio/generales
let capacidadCursos = 25;
let cuantosCursos;
let cupoMaximoCole;
let cantidadChicas;
let cantidadChicos;
let totalAlumnosCole;

//formulario curso
let cursoIngresado;
let chicasYaAnotadas;
let chicosYaAnotados;
let totalAlumnosYaAnotados;
let inscribirChicas;
let inscribirChicos;
let totalDeInscriptos;
let totalAlumnosCurso;

//formulario alumno
let nombreAlumno;
let apellidoAlumno;
let direccionAlumno;
let numDireccionAlumno;
let telefonoAlumno;
let correoAlumno;
let generoAlumno;

//listas
let listaCursos = [];
let listaChicasYaAnotadas = [];
let listaChicosYaAnotados = [];
 
//deteniendo envio
const handleSubmit = e => {
    e.preventDefault();
}
const formularioInscripcionesCole = document.getElementById('formularioColegio');
formularioInscripcionesCole.addEventListener('submit', handleSubmit);
const formularioInscripcionCursos = document.getElementById('inscripcionCursos');
formularioInscripcionCursos.addEventListener('submit', (e) => {
    e.preventDefault();
});

$(document).ready(function(){
    $('#botonVerAlumnos').hide();
    //cantidad de cursos
    $('#cantidadCursos').change(function(e){
        cuantosCursos = parseInt(this.value);
        $('#vacaDisponible').html('');
        cupoMaximoCole = cuantosCursos * capacidadCursos;
        $('#cantChicasEscuela').attr('placeholder', cupoMaximoCole);
        $('#vacaDisponible').append(`Tenemos disponibles ${cupoMaximoCole} vacantes en el colegio`);
    });
    //cantidad chicas escuela
    $('#cantChicasEscuela').change(function(){
        cantidadChicas = parseInt(this.value);
        totalAlumnosCole = parseInt(cantidadChicas + cantidadChicos);
        valChicasCole();
    });
    //cantidad chicos escuela
    $('#cantChicosEscuela').change(function(){
        cantidadChicos = parseInt(this.value);
        totalAlumnosCole = cantidadChicas + cantidadChicos;
        valChicosCole();
    });

    //VALIDACIONES
    //chicas
    function valChicasCole(){
        $('#chicasColeVal p').remove();
        $('#chicosColeVal p').remove();
        $('#vacaDisponible').html('');
        $('#vacaDisponible2').html('');
        if(cantidadChicas < 0){
            $('#chicasColeVal').append('<p><b>No puede anotar alumnos en negativo</b></p>');
            $('#cantChicasEscuela').focus();
            $('#cantChicosEscuela').attr('disabled', true);
        }
        else if(cantidadChicas > cupoMaximoCole){
            $('#chicasColeVal').append(`<p><b>Excedió el cupo máximo</b></p>`);
            $('#cantChicasEscuela').focus();
            $('#cantChicosEscuela').attr('disabled', true);
        }
        else if(cantidadChicas == cupoMaximoCole){
            $('#chicosColeVal').append(`<p><b>Ya no quedan bacantes</b></p>`);
            $('#cantChicasEscuela').focus();
            $('#cantChicosEscuela').attr('disabled', true);
        }
        else{
            $('#cantChicosEscuela').attr('placeholder', cupoMaximoCole - cantidadChicas);
            $('#cantChicosEscuela').attr('disabled', false);
            $('#cantChicosEscuela').focus();
            $('#vacaDisponible2').append(`Tenemos disponibles ${cupoMaximoCole - cantidadChicas} vacantes`);
        }
    }
    //chicos
    function valChicosCole(){
        $('#chicosColeVal p').remove();
        if(cantidadChicos < 0){
            $('#chicosColeVal').append('<p><b>No puede anotar alumnos en negativo</b></p>');            
            $('#cantChicosEscuela').focus();   
        }
        else if(cantidadChicos > cupoMaximoCole - cantidadChicas || cantidadChicos > cupoMaximoCole){
            $('#chicosColeVal').append(`<p><b>Excedió el cupo máximo</b></p>`);
            $('#cantChicosEscuela').focus();
        }
        else if(cantidadChicos == cupoMaximoCole - cantidadChicas || cantidadChicos == cupoMaximoCole){
            $('#chicosColeVal').append(`<p><b>Ya no quedan bacantes</b></p>`);
        }
        else{
            let vacanteCole = document.getElementById('coleVacante');
            vacanteCole.innerText = `Tenemos ${cupoMaximoCole - totalAlumnosCole} vacantes disponibles`;
            vacanteCole.style.font = 'italic 20px arial';
            vacanteCole.style.color = 'green';
            crearHTMLDeCursos();
        }
    }

    //FORMULARIO CURSOS
    //creando formulario
    function crearHTMLDeCursos(contadorAlumnos){   
        const cantidadDeCursos = $('#cantidadCursos').val();
        const formularioDinamico = document.getElementById('inscripcionCursos');
        formularioDinamico.innerHTML = '';
        for (let i = 0; i < cantidadDeCursos; i++){
            let objetoCurso = {
                nombreCurso: null,
                chicasAnotadas: 0,
                chicosAnotados: 0,
                totalAlumnosAnotados: 0,
                chicasInscriptas: 0 ,
                chicosInscriptos: 0,
                totalDeInscriptos: 0,
                datosDeAlumno: [],
                totalAlumnosCurso:0
            }
            listaCursos.push(objetoCurso);
            $('#inscripcionCursos').append(`
                <form id="formulario${+i}" class="m-2">
                    <div class="form-group col-md-12 p-0">
                        <label>Ingrese curso</label>
                        <input type="text" id="curso${+i}" name="curso${+i}" class="form-control">
                    </div>
                    <div class="form-row">
                        <div id="chicasValidadas${+i}" class="form-group col-md-6">
                            <label>Cuantas chicas tiene dicho curso?</label>
                            <input type="number" min="0" id="chicas${+i}" name="chicas${+i}" class="form-control" placeholder="${capacidadCursos}">
                        </div>
                        <div id="chicosValidados${+i}" class="form-group col-md-6">
                            <label>Cuantos chicos tiene dicho curso?</label>
                            <input type="number" min="0" id="chicos${+i}" name="chicos${+i}" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div id="chicasNuevVal${+i}" class="form-group col-md-6">
                            <label>Cuantas chicas desea inscribir?</label>
                            <input type="number" min="0" id="chicasNuevas${+i}" name="chicasNuevas${+i}" class="form-control">
                        </div>
                        <div id="chicosNuevVal${+i}" class="form-group col-md-6">
                            <label>Cuantos chicos desea inscribir?</label>
                            <input type="number" min="0" id="chicosNuevos${+i}" name="chicosNuevos${+i}" class="form-control">
                        </div>
                    </div>
                </form>`
            );
            
            //funciones escuchan input de cursos
            nombreCurso(i);
            escuchandoChicas(i);
            escuchandoChicos(i);
            escuchandoChicasNuevas(i);
            escuchandoChicosNuevos(i, contadorAlumnos);
        }
    }

    //input curso
    function nombreCurso(contCurso){
        $(`#chicas${contCurso}`).attr('disabled', true);
        $(`#chicos${contCurso}`).attr('disabled', true);
        $(`#chicasNuevas${contCurso}`).attr('disabled', true);
        $(`#chicosNuevos${contCurso}`).attr('disabled', true);
        $(`#curso${contCurso +1}`).attr('disabled', true); //VER SI FUNCION

        $(`#curso${contCurso}`).change(function(e){
            cursoIngresado = e.target.value.toLowerCase();
            $(`#chicas${contCurso}`).attr('disabled', false);
            $(`#chicas${contCurso}`).focus();
            //validacion
            validandoNombreCurso(contCurso);
            listaCursos[contCurso].nombreCurso= cursoIngresado;
           
            //ovultando tabla alumnos
            if($('#alumnosRegistrados').is(':visible')){
                $('#alumnosRegistrados').hide();
            }
        });
    }
    //input chicas
    function escuchandoChicas(contCurso){
        $(`#chicas${contCurso}`).change(function(e){
            chicasYaAnotadas = parseInt(e.target.value);
            $(`#chicos${contCurso}`).attr('disabled', false);
            $(`#chicos${contCurso}`).focus();
            $(`#chicos${contCurso}`).attr('placeholder', capacidadCursos - chicasYaAnotadas);
            //validacion
            validarChicasYaAnotadas(contCurso);
            listaCursos[contCurso].chicasAnotadas = chicasYaAnotadas;
        });
    }
    //input chicos
    function escuchandoChicos(contCurso){
        $(`#chicos${contCurso}`).change(function(e){
            chicosYaAnotados = parseInt(e.target.value);
            totalAlumnosYaAnotados = chicasYaAnotadas + chicosYaAnotados;
            $(`#chicasNuevas${contCurso}`).attr('disabled', false)
            $(`#chicasNuevas${contCurso}`).focus();
            $(`#chicasNuevas${contCurso}`).attr('placeholder', capacidadCursos - totalAlumnosYaAnotados);
            //validacion
            validarChicosYaAnotados(contCurso);
            listaCursos[contCurso].chicosAnotados = chicosYaAnotados;
            listaCursos[contCurso].totalAlumnosAnotados = totalAlumnosYaAnotados;    
            //alumnos ya anotados/api
            obtenerAlumnosPorApi(contCurso);
        });
    }
    //input chicas nuevas
    function escuchandoChicasNuevas(contCurso){
        $(`#chicasNuevas${contCurso}`).change(function(e){
            inscribirChicas = parseInt(e.target.value);
            let totalAlumnosEnElCurso = parseInt(totalAlumnosYaAnotados + (inscribirChicas + inscribirChicos));
            $(`#chicosNuevos${contCurso}`).attr('disabled', false);  
            $(`#chicosNuevos${contCurso}`).focus();        
            $(`#chicosNuevos${contCurso}`).attr('placeholder', (capacidadCursos - totalAlumnosYaAnotados) - inscribirChicas);
            //validacion
            validarChicasnuevas(contCurso);
            listaCursos[contCurso].chicasInscriptas = inscribirChicas;
            listaCursos[contCurso].totalAlumnosAnotados = totalAlumnosYaAnotados;
            listaCursos[contCurso].totalAlumnosCurso = totalAlumnosEnElCurso;
        });
    }
    //input chicos nuevos
    function escuchandoChicosNuevos(contCurso,contadorAlumnos){
        $(`#chicosNuevos${contCurso}`).change(function(e){
            inscribirChicos = parseInt(e.target.value);
            totalInscriptos = inscribirChicas + inscribirChicos;
            let totalAlumnosEnElCurso = totalAlumnosYaAnotados + totalInscriptos;
            totalAlumnosCurso = totalAlumnosEnElCurso;
            //validacion
            validarChicosnuevos(contCurso,contadorAlumnos);
            listaCursos[contCurso].chicosInscriptos = inscribirChicos;
            listaCursos[contCurso].totalDeInscriptos = totalInscriptos;
            listaCursos[contCurso].totalAlumnosCurso = totalAlumnosEnElCurso;
        });
    }

    //VALIDACIONES
    //curso
    const validandoNombreCurso = (contCurso) => {
        $(`#curso${contCurso} p`).html('');
        if(cursoIngresado == ''){
            $(`#curso${contCurso}`).append('<p><b>Ingrese el nombre del curso</b></p>');
            $(`#curso${contCurso}`).focus();
        }
        else{
            $(`#chicas${contCurso}`).focus();
        }
    }
    //chicas
    const validarChicasYaAnotadas = (contCurso) => {
        $(`#chicas${contCurso}`);
        $(`#chicasValidadas${contCurso} p`).html('');
        $(`#chicosValidados${contCurso} p`).html('');
        if(chicasYaAnotadas < 0){
            $(`#chicasValidadas${contCurso}`).append('<p><b>No puede anotar alumnos en negativo</b></p>');
            $(`#chicas${contCurso}`).focus();
        }
        else if(chicasYaAnotadas > capacidadCursos){
            $(`#chicasValidadas${contCurso}`).append(`<p><b>Excedió el cupo máximo</b></p>`);
            $(`#chicas${contCurso}`).focus();
        }
        else if(chicasYaAnotadas == capacidadCursos){
            $(`#chicosValidados${contCurso}`).append(`<p><b>Ya no quedan bacantes</b></p>`);
            $(`#chicas${contCurso}`).focus();
        }
        else{
            $(`#chicos${contCurso}`).focus();
        }
    }
    //chicos
    const validarChicosYaAnotados = (contCurso) => {
        $(`#chicos${contCurso}`);
        $(`#chicosValidados${contCurso} p`).html('');
        $(`#chicasNuevVal${contCurso} p`).html('');
        if(chicosYaAnotados < 0){
            $(`#chicosValidados${contCurso}`).append('<p><b>No puede anotar alumnos en negativo</b></p>');
            $(`#chicos${contCurso}`).focus();
        }
        else if(chicasYaAnotadas >= capacidadCursos || chicosYaAnotados > capacidadCursos - chicasYaAnotadas || chicosYaAnotados > capacidadCursos){
            $(`#chicosValidados${contCurso}`).append(`<p><b>Excedió el cupo máximo</b></p>`);
            $(`#chicos${contCurso}`).focus();
        }
        else if(chicasYaAnotadas + chicosYaAnotados == capacidadCursos|| chicosYaAnotados == capacidadCursos){
            $(`#chicasNuevVal${contCurso}`).append(`<p><b>Ya no quedan bacantes</b></p>`);
            $(`#chicos${contCurso}`).focus();
        }
        else{
            $(`#chicasNuevas${contCurso}`).focus();
        }
    }
    //chicas nuevas
    const validarChicasnuevas = (contCurso) => {
        $(`#chicasNuevVal${contCurso}`);
        $(`#chicasNuevVal${contCurso} p`).html('');
        $(`#chicosNuevVal${contCurso} p`).html('');
        if(inscribirChicas < 0){
            $(`#chicasNuevVal${contCurso}`).append('<p><b>No puede anotar alumnos en negativo</b></p>');
            $(`#chicasNuevas${contCurso}`).focus();
        }
        else if(totalAlumnosYaAnotados >= capacidadCursos || inscribirChicas > capacidadCursos - totalAlumnosYaAnotados || inscribirChicas > capacidadCursos){
            $(`#chicasNuevVal${contCurso}`).append(`<p><b>Excedió el cupo máximo</b></p>`);
            $(`#chicasNuevas${contCurso}`).focus();
        }
        else if((totalAlumnosYaAnotados + inscribirChicas) == capacidadCursos || inscribirChicas == capacidadCursos){
            $(`#chicosNuevVal${contCurso}`).append(`<p><b>Ya no quedan bacantes</b></p>`);
            $(`#chicasNuevas${contCurso}`).focus();
        }
        else{
            $(`#chicosNuevos${contCurso}`).focus();
        }
    }
    //chicos nuevos
    const validarChicosnuevos = (contCurso, contadorAlumnos) => {
        $(`#chicosNuevVal${contCurso}`);
        $(`#chicosNuevVal${contCurso} p`).html('');
        if(inscribirChicos < 0){
            $(`#chicosNuevVal${contCurso}`).append('<p><b>No puede anotar alumnos en negativo</b></p>');
            $(`#chicosNuevos${contCurso}`).focus();
        }
        else if(inscribirChicos > capacidadCursos - (totalAlumnosYaAnotados + inscribirChicas) || inscribirChicos > capacidadCursos){
            $(`#chicosNuevVal${contCurso}`).append(`<p><b>Excedió el cupo máximo</b></p>`);
            $(`#chicosNuevos${contCurso}`).focus();
        }
        else if(inscribirChicos < capacidadCursos - (totalAlumnosYaAnotados + inscribirChicas) || inscribirChicos <= capacidadCursos){
            crearHTMLDeAlumnos(contCurso,inscribirChicos+inscribirChicas, contadorAlumnos);
            $(`#nombre${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            console.log('REFRESQUE LA PAGINA');
        }
    }

    //FORMULARIO ALUMNOS
    //creando formulario
    function crearHTMLDeAlumnos(contCurso, totalDeInscriptos){
        for(let i = 0; i <  totalDeInscriptos; i++){
            botonAnotarAlumnos(contCurso, i);
            $(`#formulario${contCurso}`).append(`
            <section  id="formularioDeAlumnos${contCurso}_${i}" class="rounded-bottom m-0">
                <form id="formularioAlumnos${contCurso}_${i}" class="needs-validation bg-dark text-white mt-0 p-2">
                    <div class="form-row">
                        <div id="nombreDiv${i}" class="form-group col-md-6 ">
                            <label>Nombre (*)</label>
                            <input type="text" id="nombre${contCurso}_${i}" name="nombre${contCurso}_${i}" class="form-control" required="required" placeholder="nombre">
                        </div>
                        <div id="apellidoDiv${i}" class="form-group col-md-6 ">
                            <label>Apellido (*)</label>
                            <input type="text" id="apellido${contCurso}_${i}" name="apellido${contCurso}_${i}" class="form-control" required="required" placeholder="apellido">
                        </div>
                    </div>
                    <div class="form-row">
                        <div id="direccionDiv${i}" class="form-group col-md-8">
                            <label>Direccion (*)</label>
                            <input type="text" id="direccion${contCurso}_${i}" name="direccion${contCurso}_${i}" class="form-control" required="required" placeholder="direccion">
                        </div>
                        <div id="numDireccionDiv${i}" class="form-group col-md-4">
                            <label>Numero (*)</label>
                            <input type="number" id="numDireccion${contCurso}_${i}" name="numDireccion${contCurso}_${i}" class="form-control" required="required" placeholder="1234">
                        </div>
                    </div>
                    <div class="form-row">
                        <div id="telefonoDiv${i}" class="form-group col-md-4 ">
                            <label>Telefono (*)</label>
                            <input type="number" minlength="8" maxlength="10" id="telefono${contCurso}_${i}" name="telefono${contCurso}_${i}" class="form-control" required="required" placeholder="11 1234 5678">
                        </div>
                        <div id="correoDiv${i}" class="form-group col-md-4">
                            <label>Email (*)</label>
                            <input type="email" id="correo${contCurso}_${i}" name="correo${contCurso}_${i}" class="form-control" required="required" placeholder="nombre@ejemplo.com">
                        </div>
                        <div id="generoDiv${i}" class="form-group col-md-4">
                            <label>Genero (*)</label>
                            <input type="text" id="genero${contCurso}_${i}" name="genero${contCurso}_${i}" class="form-control" required="required" placeholder="femenino / masculino">
                        </div>
                    </div>
                </form>
                <p id="cantidadAlumnosNuevos${contCurso}_${i}" class="col-md-12 m-0 p-0 bg-dark text-white text-right"><b>Inscripcion ${i+1} de ${totalDeInscriptos}</b></p>
                <div  class="col-md-12 p-0">
                    <button id="botonEnviar${contCurso}_${i}" class="col-md-12 btn btn-dark btn-lg">Enviar</button>
                </div>
            </section>`)
            
            //funciones escuchan input de alumnos
            nombreDelAluno (i, contCurso);
            apellidoDelAlumno (i, contCurso);
            direccionDelAlumno (i, contCurso);
            numDireccionDelAlumno (i, contCurso);
            telefonoDelAlumno (i, contCurso);
            correoDelAlumno (i, contCurso);
            generoDelAlumno (i, contCurso);
            btnEnviarAlumno(i, contCurso, listaCursos, totalAlumnosCurso);
        }
        // ocultar todos los botones botonInscribir excepto el primero. 
        $(`#formulario${contCurso} .botonInscribir`).hide();
        $(`#formulario${contCurso} .botonInscribir`).first().show();
    }

    //input nombre
    const nombreDelAluno = (contadorAlumnos, contCurso) => {
        $(`#apellido${contCurso}_${contadorAlumnos}`).attr('disabled', true);
        $(`#direccion${contCurso}_${contadorAlumnos}`).attr('disabled', true);
        $(`#numDireccion${contCurso}_${contadorAlumnos}`).attr('disabled', true);
        $(`#telefono${contCurso}_${contadorAlumnos}`).attr('disabled', true);
        $(`#correo${contCurso}_${contadorAlumnos}`).attr('disabled', true);
        $(`#genero${contCurso}_${contadorAlumnos}`).attr('disabled', true);

        $(`#nombre${contCurso}_${contadorAlumnos}`).change(function(e){
           let nombreAlumno = e.target.value.toLowerCase();
           $(`#apellido${contCurso}_${contadorAlumnos}`).attr('disabled', false);
           //validacion
           validandoNombre(contCurso, contadorAlumnos, nombreAlumno);
       })
    };
    //input apellido
    const apellidoDelAlumno = (contadorAlumnos,contCurso) => {
        $(`#apellido${contCurso}_${contadorAlumnos}`).change(function(e){
            let apellidoAlumno = e.target.value.toLowerCase();
            $(`#direccion${contCurso}_${contadorAlumnos}`).attr('disabled', false);
            //validacion
            validandoApellido(contCurso, contadorAlumnos, apellidoAlumno);
        })
    };
    //input direccion
    const direccionDelAlumno = (contadorAlumnos,contCurso) => {
        $(`#direccion${contCurso}_${contadorAlumnos}`).change(function(e){
            let direccionAlumno = e.target.value.toLowerCase();
            $(`#numDireccion${contCurso}_${contadorAlumnos}`).attr('disabled', false);
            //validacion
            validandoDireccion(contCurso, contadorAlumnos, direccionAlumno);
        })
    };
    //input numeracion
    const numDireccionDelAlumno = (contadorAlumnos,contCurso) => {
        $(`#numDireccion${contCurso}_${contadorAlumnos}`).change(function(e){
            let numDireccionAlumno = parseInt(e.target.value);
            $(`#telefono${contCurso}_${contadorAlumnos}`).attr('disabled', false);
            //validacion
            validandoNumDireccion(contCurso, contadorAlumnos, numDireccionAlumno);
        })
    };
    //input telefono
    const telefonoDelAlumno = (contadorAlumnos, contCurso) => {
        $(`#telefono${contCurso}_${contadorAlumnos}`).change(function(e){
            let telefonoAlumno = parseInt(e.target.value);
            $(`#correo${contCurso}_${contadorAlumnos}`).attr('disabled', false);
            //validacion
            validandoTelefono(contCurso, contadorAlumnos, telefonoAlumno);
        })
    };
    //input mail
    const correoDelAlumno = (contadorAlumnos,contCurso) => {
        $(`#correo${contCurso}_${contadorAlumnos}`).change(function(e){
            let correoAlumno = e.target.value.toLowerCase();
            $(`#genero${contCurso}_${contadorAlumnos}`).attr('disabled', false);
            //validacion
            validandoCorreo(contCurso, contadorAlumnos, correoAlumno);
        })
    };
    //input genero
    const generoDelAlumno = (contadorAlumnos,contCurso) => {
        $(`#genero${contCurso}_${contadorAlumnos}`).change(function(e){
            let generoAlumno = e.target.value.toLowerCase();
            $(`#curso${contCurso}`).attr('disabled', false);
            //validacion
            validandoGenero(contCurso, contadorAlumnos, generoAlumno);
            //tabla datos generales
            porcentajeCurso(contCurso);
        })
    };

    //VALIDACIONES
    //nombre
    const validandoNombre = (contCurso, contadorAlumnos, nombreAlumno) => {
        $(`#nombre${contCurso}_${contadorAlumnos}`);
        $(`#nombreDiv${contadorAlumnos} p`).html('');
        let nombreEnNumero = Number(nombreAlumno);
        if(nombreEnNumero == '' || !isNaN(nombreEnNumero) ){
            $(`#nombreDiv${contadorAlumnos}`).append('<p><b>Debe escribir un nombre y no debe contener numeros</b></p>')
            $(`#nombre${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            $(`#apellido${contCurso}_${contadorAlumnos}`).focus();
        }
    }
    //apellido
    const validandoApellido = (contCurso, contadorAlumnos, apellidoAlumno) => {
        $(`#apellido${contCurso}_${contadorAlumnos}`);
        $(`#apellidoDiv${contadorAlumnos} p`).html('');
        let apellidoEnNumero = Number(apellidoAlumno);
        if(apellidoEnNumero == '' || !isNaN(apellidoEnNumero) ){
            $(`#apellidoDiv${contadorAlumnos}`).append('<p><b>Debe escribir un apellido y no debe contener numeros</b></p>')
            $(`#apellido${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            $(`#direccion${contCurso}_${contadorAlumnos}`).focus();
        }
    }
    //direccion
    const validandoDireccion = (contCurso, contadorAlumnos, direccionAlumno) => {
        $(`#direccion${contCurso}_${contadorAlumnos}`);
        $(`#direccionDiv${contadorAlumnos} p`).html('');
        let direccionEnNumero = Number(direccionAlumno);
        if(direccionEnNumero == '' || !isNaN(direccionEnNumero) ){
            $(`#direccionDiv${contadorAlumnos}`).append('<p><b>Debe escribir una dirección y no debe contener numeros</b></p>')
            $(`#direccion${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            $(`#numDireccion${contCurso}_${contadorAlumnos}`).focus();
        }
    }
    //numeracion
    const validandoNumDireccion = (contCurso, contadorAlumnos, numDireccionAlumno) => {
        $(`#numDireccion${contCurso}_${contadorAlumnos}`);
        $(`#numDireccionDiv${contadorAlumnos} p`).html('');
        if(numDireccionAlumno == '' || numDireccionAlumno < 0){
            $(`#numDireccionDiv${contadorAlumnos}`).append('<p><b>Debe escribir la numeración de la dirección sin numeros negativos</b></p>')
            $(`#numDireccion${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            $(`#telefono${contCurso}_${contadorAlumnos}`).focus();
        }
    }
    //telefono
    const validandoTelefono = (contCurso, contadorAlumnos, telefonoAlumno) => {
        $(`#telefono${contCurso}_${contadorAlumnos}`);
        $(`#telefonoDiv${contadorAlumnos} p`).html('');
        if(telefonoAlumno == '' || telefonoAlumno < 0){
            $(`#telefonoDiv${contadorAlumnos}`).append('<p><b>Numero ingresado incorrecto</b></p>');
            $(`#telefono${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            $(`#correo${contCurso}_${contadorAlumnos}`).focus();
        }
    }
    //mail
    const validandoCorreo = (contCurso, contadorAlumnos, correoAlumno) => {
        $(`#correo${contCurso}_${contadorAlumnos}`);
        $(`#correoDiv${contadorAlumnos} p`).html('');
        if(correoAlumno.includes('@') && correoAlumno.includes('.') && correoAlumno != ''){
            $(`#genero${contCurso}_${contadorAlumnos}`).focus();
        }
        else{
            $(`#correoDiv${contadorAlumnos}`).append('<p><b>Debe ingresar un email</b></p>');
            $(`#correo${contCurso}_${contadorAlumnos}`).focus();
        }
    }
    //genero
    const validandoGenero = (contCurso, contadorAlumnos, generoAlumno) => {
        $(`#genero${contCurso}_${contadorAlumnos}`);
        $(`#generoDiv${contadorAlumnos} p`).html('');
        if(generoAlumno == 'femenino' || generoAlumno == 'masculino'){
            $(`#curso${contCurso +1}`).focus();
            $(`#botonEnviar${contCurso}_${contadorAlumnos}`).slideDown(1000);
        }
        else{
            $(`#generoDiv${contadorAlumnos}`).append('<p><b>Debe completar con: "femenino" o "masculino"</b></p>');
            $(`#botonEnviar${contCurso}_${contadorAlumnos}`).slideUp(1000);            
            $(`#genero${contCurso}_${contadorAlumnos}`).focus();
        }
    }

    //DATOS DE ALUMNOS PREEXISTENTES
    const obtenerAlumnosPorApi = (contCurso) => {
        const urlApi = `https://randomuser.me/api/?results=${cupoMaximoCole}&inc=gender,name,location,email,phone,nat&nat=es`;
        $.get(urlApi, function(respuesta, estado){
            console.log(respuesta, estado);
            let listaAlumnosYaInscriptos = [];
            for(const dato of respuesta.results){
                const alumnoYaInscripto = {
                    objetoNombre: dato.name.first,
                    objetoApellido: dato.name.last,
                    objetoDireccion: dato.location.street.name,
                    objetoNumDireccion: dato.location.street.number,
                    objetoTelefono: dato.phone,
                    objetoCorreo: dato.email,
                    objetoGenero: (dato.gender == 'male') ? 'masculino' : 'femenino'
                }
                listaAlumnosYaInscriptos.push(alumnoYaInscripto);
            }
            //datos de chicas 
            let chicasPreExistentes = listaAlumnosYaInscriptos.filter(alumno => alumno.objetoGenero == 'femenino').slice(0, chicasYaAnotadas);
            listaChicasYaAnotadas = chicasPreExistentes;
            //datos de chicos
            let chicosPreExistentes = listaAlumnosYaInscriptos.filter(alumno => alumno.objetoGenero == 'masculino').slice(0, chicosYaAnotados);
            listaChicosYaAnotados = chicosPreExistentes;
            //total alumnos preexistentes
            let totalPreExistentes = chicasPreExistentes.concat(chicosPreExistentes);
            listaCursos[contCurso].datosDeAlumno = totalPreExistentes;
        });
    };

    //BOTON FORMULARIO ALUMNOS
    const botonAnotarAlumnos = (contCurso, contadorAlumnos) =>{
        $(`#formulario${contCurso}`).append(`
             <div id="mostrarBotInscripcion${contCurso}" class="col-md-12 p-0">
                 <button id="botonInscripcion${contCurso}_${contadorAlumnos}" class="col-md-12 btn btn-dark mt-2 botonInscribir">Inscribir alumnos</button>
             </div>
         `)
    }

    //ENVIAR FORMULARIO ALUMNOS
    const btnEnviarAlumno = (contadorAlumnos, contCurso, listaCursos, totalAlumnosCurso) => {
        $(`#botonEnviar${contCurso}_${contadorAlumnos}`).hide();
        $(`#cantidadAlumnosNuevos${contCurso}_${contadorAlumnos}`).hide();
        $(`#formularioAlumnos${contCurso}_${contadorAlumnos}`).hide();
        
        $(`#botonInscripcion${contCurso}_${contadorAlumnos}`).click(function(){
            $(`#botonInscripcion${contCurso}_${contadorAlumnos+1}`).show();
            $(`#formularioAlumnos${contCurso}_${contadorAlumnos}`).slideDown(1000);
            $(`#nombre${contCurso}_${contadorAlumnos}`).focus();
            $(`#cantidadAlumnosNuevos${contCurso}_${contadorAlumnos}`).slideDown(1000);
        });
        //Enviando todos los datos recopilados
        $(`#botonEnviar${contCurso}_${contadorAlumnos}`).click(function(){
            listaCursos[contCurso].datosDeAlumno.push({
                objetoNombre:  $(`#nombre${contCurso}_${contadorAlumnos}`).val(),
                objetoApellido: $(`#apellido${contCurso}_${contadorAlumnos}`).val(),
                objetoDireccion: $(`#direccion${contCurso}_${contadorAlumnos}`).val(),
                objetoNumDireccion: $(`#numDireccion${contCurso}_${contadorAlumnos}`).val(),
                objetoTelefono: $(`#telefono${contCurso}_${contadorAlumnos}`).val(),
                objetoCorreo: $(`#correo${contCurso}_${contadorAlumnos}`).val(),
                objetoGenero: $(`#genero${contCurso}_${contadorAlumnos}`).val()
            })
            //guardando en localStorage los datos del curso
            localStorage.setItem('listaDeCursos', JSON.stringify(listaCursos));
            let mirandoStorageDeListaCursos = JSON.parse(localStorage.getItem('listaDeCursos'));
            console.log(mirandoStorageDeListaCursos);

            $(`#botonEnviar${contCurso}_${contadorAlumnos}`).slideUp(2000);
            $(`#cantidadAlumnosNuevos${contCurso}_${contadorAlumnos}`).slideUp(2000);
            $(`#formularioAlumnos${contCurso}_${contadorAlumnos}`).slideUp(1000);
            $(`#botonInscripcion${contCurso}_${contadorAlumnos}`).slideUp(2000);
            $(`#curso${contCurso +1}`).focus();
            validarAlumnos(totalAlumnosCurso, listaCursos[contCurso].datosDeAlumno);
        })
    }

     //TABLA DATOS GENERALES DEL CURSO
    const porcentajeCurso = (contCurso) => {
        let totalChicas = parseInt(chicasYaAnotadas + inscribirChicas);
        let totalChicos = parseInt(chicosYaAnotados + inscribirChicos);
        let porcentajeChicas = parseInt((totalChicas * 100) / totalAlumnosCurso);
        let porcentajeChicos = parseInt((totalChicos * 100) / totalAlumnosCurso);
        //creando tabla numeros finales
        $(`#${contCurso}_tabla`).remove();
        $(`#formulario${contCurso}`).append(`
        <table id="${contCurso}_tabla" class="m-0 text-center table table-striped table-dark table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Curso</th>
                    <th scope="col">Cantidad de chicas</th>
                    <th scope="col">Cantidad de chicos</th>
                    <th scope="col">Total</th>
                    <th scope="col">Vacantes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${$(`#curso${contCurso}`).val()}</td>
                    <td>${porcentajeChicas}%</td>
                    <td>${porcentajeChicos}%</td>
                    <td>${totalAlumnosCurso}</td>
                    <td>${capacidadCursos - totalAlumnosCurso}</td>
                </tr>
            </tbody>
        </table>`);
    }

    //validacion  tabla consultar alumnos anotados
     const validarAlumnos = (totalAlumnosCurso, datosDeAlumno) => {
        if (totalAlumnosCurso == datosDeAlumno.length){
            $('#botonVerAlumnos').slideDown(2000);
        }
    }   
    //TABLA CONSULTAR ALUMNOS ANOTADOS
    const tablaNombreDeAlumnos = () => {
        $('#botonVerAlumnos').click(function(){
            if($('#alumnosRegistrados').is(':visible')){
                $('#alumnosRegistrados').hide();
            }
            else{
                $('#alumnosRegistrados').slideDown(1000);
                $('#alumnosRegistrados').html('');
                const listaCursosFiltrada = listaCursos.filter(curso => curso.nombreCurso && curso.datosDeAlumno.length === curso.totalAlumnosCurso);
                for(const curso of listaCursosFiltrada){
                    let fila = ''
                    for( const alumno of curso.datosDeAlumno){
                        fila += `<tr>
                                    <td>${alumno.objetoNombre}</td>
                                    <td>${alumno.objetoApellido}</td>
                                </tr>`
                    }
                    const tabla = 
                    `<table class="table table-bordered text-center table-striped table-light table-bordered m-0">
                        <thead class="table-dark">
                        <th colspan="2">Curso ${curso.nombreCurso}</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="nombreTabla">Nombre</td>
                                <td id="nombreTabla">Apelludo</td>
                                </tr>
                                ${fila}
                        </tbody>
                    </table>`;
                    $('#alumnosRegistrados').append(tabla);
                }
            }
        });
    };
    tablaNombreDeAlumnos();
}); 