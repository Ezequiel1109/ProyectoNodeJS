/*
    ejemplo como hacerlo  
    _listado;
    {'uuid-1234567-1234567-2:{id:12, desc:asd, completadoEn: 03/03/3030 } },
    {'uuid-1234567-1234567-2:{id:12, desc:asd, completadoEn: 03/03/3030 } },
    {'uuid-1234567-1234567-2:{id:12, desc:asd, completadoEn: 03/03/3030 } }
*/
const Tarea = require('./tarea');
class Tareas{
    
    _listado = {};

    get listadoArray(){
        const listado =[];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor()
    {
        this._listado= {};
    }

    borrarTarea(id='')
    {
        if (this._listado[id])
        {
            delete this._listado[id];
        }
    }

    cargaraTareasFromArray( tareas =[])
    {
        //this._listado[tarea.id]= tarea;
        tareas.forEach(tarea =>
            {
                this._listado[tarea.id]= tarea;
            });
    }

    crearTarea( desc = '')
    {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; 

    }

    listadoCompleto()
    {
        this.listadoArray.forEach((tarea, i) =>{

            const idx = `${ i + 1 }`.green;
            const {desc, completadoEn} = tarea;
            
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red;
            
            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });

        //completada: verde
        //Pendiente: rojo
    }

    listarPendientesCompletadas(completadas = true)
    {
        console.log();
        let contador = 0;
        this.listadoArray.forEach(tarea =>{

            
            const {desc, completadoEn} = tarea;
            
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red;

                            if(completadas)
                            {
                                if(completadoEn){
                                    contador +=1;
                                    //forma 1
                                    //console.log(`${ contador.toString().green }. ${ desc } :: ${ estado }`);
                                    //forma 2
                                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);

                                }
                            }
                            else
                            {
                                if(!completadoEn){
                                    contador +=1;
                                    //console.log(`${ contador.toString().green } ${ desc } :: ${ estado }`);
                                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                                }
                            }
            
           
        });

    }

    toggleCompletadas(ids =[])
    {
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArray.forEach(tarea =>{
            if(!ids.includes(tarea.id))
            {
                //forma 1
                //const tarea = this._listado[id];
                this._listado[tarea.id].completadoEn = null;
                //tarea.completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
