const fs = require('fs');
const axios = require('axios');
const { resourceUsage } = require('process');

class Busquedas
{
    historial = [];
    dbPath ='./db/database.json';
    constructor(){
       //leer db si existe 
        this.leerBD();
    }

    get historialCapitalizado(){

        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        })
    }

    get paramsMapBox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramWheather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units:'metric',
            lang: 'es'
        }
    }
    async ciudad(lugar = ''){

        try{
            //peticion http
            //console.log('cuidad',lugar);
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await intance.get();
            //console.log(resp.data.features);
            return resp.data.features.map(lugar =>({
                id: lugar.id,
                nombre:  lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/san.json?access_token=pk.eyJ1IjoiZXplcXVpZWwxMjAiLCJhIjoiY2ttZjVodm0zMDhnYzJ3cGthbjdhZ2p0eSJ9.rx8STTYAmNbNOEXZn4xURQ&cachebuster=1616088980977&autocomplete=true&language=es');
            //retorna los lugares

        }
        catch(error)
        {
            return[];
        }
        
    }

    async climadelLugar(lat, lon){
        try{
            //instancia axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramWheather, lat, lon}
            })

            const resp = await instance.get();
            const {weather, main} = resp.data; 
            

            //resp.data

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        }catch(error)
        {
            console.log(error);
        }
    }

    agregarHistorial(lugar ='')
    {
        //prevenir duplicidad
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar);

        // grabar en bd

        this.guardaBD();
    }
    guardaBD(){
        const payload ={
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    leerBD(){
        //debe existir...
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);
        
        //caragar la informacion
        this.historial = data.historial;
        //
    }
}
module.exports = Busquedas;