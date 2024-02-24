import dotenv from 'dotenv';
import Server from './models/sever';
dotenv.config();

const server = new Server();
server.listen();