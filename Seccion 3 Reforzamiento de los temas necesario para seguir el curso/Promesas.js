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

const getEmpleado = (id, callback) =>{
        return new promesa = new Promise((resolve, reject) => {
            const empleado = empleado.find(e => e.id 
                === id )?.nombre
                if(empleado)
                {
                    resolve(empleado);
                }
                else
                {
                    reject(`No existe empleado con id ${id}`)
                }
        });
      
        
}
const id=1 ;

getEmpleado(id)
.then(empleado => console.log(empleado))
.catch(err => console.log(err));

const getSalario =()=>{
    return new promesa = new Promise((resolve, reject) => {
        const salario = salario.find(e => e.id 
            === id )?.salario
            if(salario)
            {
                resolve(salario);
            }
            else
            {
                reject(`No existe empleado con id ${id}`)
            }
    });
   
}

getSalario(id)
.then(salario => console.log(salario))
.catch(err => console.log(err));

// caso 2

getEmpleado(id).then(empleado => {
    getSalario(id).then(salario =>{
        console.log('el empleado:',empleado, 'el salario es', salario)
    })
    .catch(err => console.log(err));
})
.catch(err => console.log(err));

//promesas en cadena 
const id =1;
let nombre;
getEmpleado(id)
.then(empleado => {
    nombre = empleado; 
    return getSalario(id)
})
.then(salario => console.log('el empleado:',nombre,'tiene un salario de:', salario))
.catch(err => console.log(err));