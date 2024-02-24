



const socketControllers = (socket) => {
        
    console.log('cliente conectado', socket.id);
         
        socket.on('disconnect',() =>{
            console.log('cliente desconectado', socket.id);
        })

        socket.on('enviar-mensaje',(payload, callback)=>{
            
            const  id = 12345;
            callback(id);

            socket.broadcast.emit('enviar-menos-mensajes', payload);
            //console.log(payload);
        })
}


module.exports = {
    socketControllers
}
