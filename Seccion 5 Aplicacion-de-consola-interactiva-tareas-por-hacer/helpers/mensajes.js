const { resolve } = require('path');

require('colors');

const mostMenu = () =>
{
    return new Promise(resolve =>{

        console.clear();
        console.log('========================='.green);
        console.log(' Seleccione una Opción'.red);
        console.log('========================'.green);

        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tareas`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir\n`);


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //question para mostrarle la informacion al usuario
        readline.question('Selecione una opcion:', (opt) =>{
            //console.log(opt);
            readline.close();
            resolve(opt);
        })
    });
    
}

const pausa =() =>{

    return new Promise(reslve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //question para mostrarle la informacion al usuario
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`,(opt) => 
        {
            readline.close();
            resolve();
        });
    });
   
}

module.exports = {
    mostMenu,
    pausa
}







