//caso 1 
setTimeout(function(){
    console.log('Hola mundo');
}, 1000);
//caso2
setTimeout(() =>{
    console.log('Hola mundo');
}, 1000);
//caso 3
const getUsuarioByid = (id, callback) =>{
    
    //informacion que vendria desde la bd
    const usuario = {
        id,
        nombre:'Fernando'
    }
    setTimeout( () =>
    {
        callback(usuario)
    }, 1500)
}
getUsuarioByid(10, () =>{
    console.log('Hola Mundo')
});
//caso 3
getUsuarioByid(10, (usuario) =>{
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase())
});