const inquirer = require('inquirer');
require('colors');
const preguntas =
[
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea Hacer',
        //choices: ['opt1','opt2','opt3']
        choices:
        [
            {
                value: 1,
                name:`${'1.'.green }Buscar`
            },
            {
                value: 2,
                name:`${'2.'.green }Historial`
            },
            {
                value: 0,
                name:`${'0.'.green }Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('========================='.green);
    console.log(' Seleccione una Opción'.red);
    console.log('========================'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() =>{
    const question =
    [
        {
            type:'input',
            name:'enter',
            message:`Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async(message)=>{
    const question =
    [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value)
            {
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} =  await inquirer.prompt(question);
    return desc;
}

const listarLugares = async(lugares =[])=>
{
    //map todo lo del arreglo lo tranforma a lo que uno quiera
    const choices = lugares.map((lugar, i )=>
        {
            const idx = `${i + 1}`.green;
            return{
                value: lugar.id,
                name: `${ idx } ${lugar.nombre}`
            }
        });

        choices.unshift({
            value:'0',
            name: '0.'.green + 'canselar'
        });
        const preguntas =[
            {
                type: 'list',
                name: 'id',
                message:'Seleccionar:',
                choices
            }
        ]
        const{id} = await inquirer.prompt(preguntas);
        return id;
}

const confirmar = async(message) =>
{
    const question =
    [
        {
            type:'confirm',
            name: 'ok',
            message
        }
    ];
    const{ok} = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoCheckList = async(tareas =[])=>
{
    //map todo lo del arreglo lo tranforma a lo que uno quiera
    const choices = tareas.map((tarea, i )=>
        {
            const idx = `${i + 1}`.green;
            return{
                value: tarea.id,
                name: `${ idx } ${tarea.desc}`,
                checked: (tarea.completadoEn)? true : false
            }
        });

        choices.unshift({
            value:'0',
            name: '0.'.green + 'cancelar'
        });
        const pregunta =[
            {
                type: 'checkbox',
                name: 'ids',
                message:'Selecciones',
                choices
            }
        ]
        const{ids} = await inquirer.prompt(pregunta);
        return ids;
}
module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}