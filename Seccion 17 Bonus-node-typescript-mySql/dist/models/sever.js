"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../database/conexion"));
//lo que exporatasera almacenado en userRoutes
//import * as userRoutes from '../routes/usuario';
class server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8082';
        //metodos iniciales
        this.middlewares();
        this.conectarDB();
        //defnir mis rutas
        this.routes();
        //carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log('database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //Cors
        this.app.use(cors_1.default());
        //lectura del body parseo
        this.app.use(express_1.default.json());
        //carpeta publica
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = server;
//# sourceMappingURL=sever.js.map