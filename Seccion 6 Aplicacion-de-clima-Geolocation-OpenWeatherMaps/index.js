require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./herlpers/inquirer");
const Busquedas = require("./models/busquedas");

//console.log(process.env.MAPBOX_KEY);

const main = async()=>{
    // const texto = await leerInput('Hola: ');
    //console.log(texto);

    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await inquirerMenu();
        //console.log({opt});

        switch(opt)
        {
            case 1:
                //peticiones http de manera sincrona 
                //Mostrar mensaje
                const termino = await leerInput('Cuidad: ');
                //await busquedas.ciudad(lugar);
                //buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                //selecionar el lugar
                const id = await listarLugares(lugares);
                if(id === '0') continue;
                
                const lugarSelect = lugares.find(l => l.id === id);
                
                //guardar en bd
                busquedas.agregarHistorial(lugarSelect.nombre)
                
                //datos del clima
                const clima = await busquedas.climadelLugar(lugarSelect.lat, lugarSelect.lng);
                
                //Mostrar Resultado
                console.clear();
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('ciudad: ', lugarSelect.nombre);
                console.log('lat: ', lugarSelect.lat);
                console.log('lng: ', lugarSelect.lng);
                console.log('Temperatura: ' , clima.temp);
                console.log('Minimo: ', clima.min);
                console.log('Maxima: ', clima.max);
                console.log('Como esta el clima: ', clima.desc);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar , indice) =>{
                    const idx = `${ indice + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
            break;
        }
        
        if(opt !== 0) await pausa();
        //await pausa();
    }while(opt !== 0)
}

main();
