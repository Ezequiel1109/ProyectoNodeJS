const empleados =[
    {
        id:1,
        nombre:'Femenino'
    },
    {
        id:2,
        nombre:'Masculino'
    },
    {
        id:3,
        nombre:'sexo'
    },
];

const salario =[
    {
        id:1,
        nombre:1000
    },
    {
        id:2,
        nombre:1500
    }
];
//caso 1
const getEmpleado = (id) =>{
    const empleado = empleado.find((e) =>{
        return e.id=== id
    })
}

//caso 2 
const getEmpleado = (id, callback) =>{
    const empleado = empleado.find(e => e.id 
        === id )?.nombre

        if(empleado){
            callback(null, empleado );
        }else
        {
            callback( `empleado con id ${id} no existe`);
        }
        
}
const getSalario = (id, callback) =>{
    const salario  = salario.find(s => s.id === id)?.salario;
    if (salario){
        callback(null, salario);
    }
    else{
        callback(`no existe salario para el id ${id}`);
    }

}
const id = 1;

getEmpleado(3,(err, empleado) => {
    if(err){
        console.log('Error!')
        return console.log(err);
    }
    console.log('empleado existe!')
    console.log(empleado.nombre);
})

console.log(getEmpleado(1));

getSalario(id, (err, salario) => {
   if(err)
   {
       return console.log(err);
   }
    console.log(salario)
})

//caso 4

getEmpleado(id,(err, empleado) => {
    if(err){
        console.log('Error!')
        return console.log(err);
    }
    getSalario(id, (err, salario) => {
        if(err)
        {
            return console.log(err);
        }
         console.log('el empleado: ', empleado, 'tiene un salario de: ', salario)
     })
})
