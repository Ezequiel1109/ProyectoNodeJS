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

const getInfoUsuario = async(id) =>{
    
    try
    {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `el salario del empleado: ${empleado} es de ${salario}`;

    }catch(error)
    {
        throw error;
    }
    
}

const id=1;

getInfoUsuario()
.then(msg =>{ 
    console.log('TODO BIEN!')
    console.log(msg)
})
.catch(erro =>{ 
    console.log('TODO MAL!')
    console.log(erro)});

getEmpleado(id)
.then(empleado => console.log(empleado))
.catch(err => console.log(err));

getSalario(id)
.then(salario => console.log(salario))
.catch(err => console.log(err));

