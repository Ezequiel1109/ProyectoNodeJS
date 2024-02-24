const deadpool ={
    nombre:'wade',
    apellido:'winston',
    poder:'regeneracion',

    getNombre()
    {
        return `${this.nombre} ${this.apellido}`
    }
}
//caso 1
//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;
//caso 2
//const{nombre, apellido, poder, edad = 0}= deadpool;
//console.log(nombre, apellido, poder, edad);

function imprimeHeroe(heroe)
{
    const{nombre, apellido, poder, edad = 0 }= deadpool
    console.log(nombre, apellido, poder, edad);
}

//imprimeHeroe(deadpool);

const heroes = ['deadpool', 'superman', 'batman'];

//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];
//solo mostrar a batman
const[ , , h3] = heroes;

console.log(h3);