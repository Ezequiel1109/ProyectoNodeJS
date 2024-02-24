const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chatMensajes = new ChatMensajes();

const socketController = async( socket = new Socket(), io)=>{
    //console.log('cliente conectado', socket.id)
    //verificar el token
    const usuario = await comprobarJWT (socket.handshake.headers['x-token']);
    
    if(!usuario){
        return socket.disconnect();
    }

    //console.log('se concecto', usuario.nombre);
    
    //cuando se conecte alguien usuarios-activos viene de server
    ChatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensaje', chatMensajes.ultimos10);
    

    //conectarlo a una sala especial
    socket.join(usuario.id);//salas: global, socket.id, usuarios.id

        
    //Limpiar cuando alguien se desconecta 
    socket.on('disconnect', ()=>{
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });

    socket.on('enviar-mensaje', ({uid, mensaje})=>{
        //console.log(payload);

        if(uid){
            //mensaje privado
            socket.to(uid).emit( 'mensaje-privado',{ de: usuario.nombre, mensaje })
        }else{
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensaje', chatMensajes.ultimos10);
        }
    })
}

module.exports ={
    socketController
}