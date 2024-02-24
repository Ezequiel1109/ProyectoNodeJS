require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa, 
        leerInput, 
        listadoTareaBorrar,
        confirmar,
        mostrarListadoCheckList } = require('./helpers/inquirer');
//const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//console.clear();

const main = async() =>
{
    //imprimir el menu 
    let opt ='';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB)
    {
        //establecer las tareas
        tareas.cargaraTareasFromArray(tareasDB);

    }

    do
    {
       opt = await inquirerMenu();
       
       switch(opt)
       {
            case '1':
                const desc= await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArray);
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id= await listadoTareaBorrar(tareas.listadoArray);
              
                if(id !== '0'){
                    const aceptar = await confirmar('¿Estas seguro que deseas borrar?');
                    if(aceptar)
                    {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
            break;

        }

        guardarDB( tareas.listadoArray);

       //const tareas = new Tareas();
       //const tarea = new Tarea('Comer comida');
       //Demostracion
       //tareas._listado[tarea.id] = tarea;
       
       //console.log(tareas);
        await pausa();
       //if(opt !== '0') await pausa();
    }
    while( opt !== '0' );
    //mostMenu();
    //pausa();
}

main();



