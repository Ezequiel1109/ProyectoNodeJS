import express,{ Application } from 'express';
import router from '../routes/usuario';
import cors from 'cors';
import db from '../database/conexion';
//lo que exporatasera almacenado en userRoutes
//import * as userRoutes from '../routes/usuario';
class server {

    private app: Application;
    private port: string;
    private apiPaths ={
        usuarios: '/api/usuarios'
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8082';
        
        //metodos iniciales
        this.middlewares();
        this.conectarDB();
        //defnir mis rutas
        this.routes();

        //carpeta publica
        this.app.use(express.static('public'));
        
    }

    async conectarDB(){
        try {
            await db.authenticate();
            console.log('database online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){

        //Cors
        this.app.use(cors());

        //lectura del body parseo
        this.app.use(express.json());

        //carpeta publica
        
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, router)
    }

    listen(){
        this.app.listen(this.port, () =>{
             console.log('Servidor corriendo en puerto ' + this.port);         
        })
    }
}

export default server;
