import { Sequelize } from 'sequelize';
//mandar la bd
const db = new Sequelize('node', 'root','',{
    host: 'localhost',
    dialect:'mysql',
    //logging: false
});

export default db;
