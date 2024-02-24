const url = ( window.location.hostname.includes('localhost') )
                    ? 'http://localhost:8081/api/auth/'
                    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';



let usuario = null;
let socket = null;

//referencias html del chat

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuario = document.querySelector('#ulUsuario');
const ulMensaje = document.querySelector('#ulMensaje');
const btnSalir = document.querySelector('#btnSalir');

//validar el token del localstorage
const validarJWT= async()=>{
    const token = localStorage.getItem('token')||'';

    if(token.length <= 10){
        window.location = 'index.html';
        throw new console.error('no hay toekn en el servidor ');
    }

    const resp = await fetch(url, {
        headers:{'x-token': token}
    });

    const {usuario: userDB, token:tokenDB} = await resp.json();
    //renovar el JWT
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title =  usuario.nombre;
    //console.log(userDB, tokenDB);
    await conectarSocket();
}

const conectarSocket = async()=>{
    
    socket = io({
        'extraHeaders':{
            'x-token':localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Sockets online')
    });

    socket.on('disconnect', () =>{
        console.log('Sockets offline')
    });

    socket.on('recibir-mensaje', dibujarMensajes);
    socket.on('usuarios-activos', dibujarUsuarios);
    
    socket.on('mensaje-privado', (payload) =>{
        console.log('Privado:', payload)
    });
}


const dibujarUsuarios=(usuarios = [])=>{
    let usersHtml ='';
    usuarios.forEach(({nombre, uid}) => {

        usersHtml +=`
            <li>
                <p>
                    <h5 class="text-succes"> ${nombre}<h5/>
                    <span class="fs-6 text-muted"> ${uid}</span>
                </p>
            </li>
        `;
    });

    ulUsuario.innerHTML = usersHtml;
}


const dibujarMensajes=(mensajes = [])=>{
    let mensajesHtml ='';
    mensajes.forEach(({nombre, mensaje}) => {

        mensajesHtml +=`
            <li>
                <p>
                    <span class="text-primary"> ${nombre}:</span>
                    <span class="fs-6 text-muted"> ${mensaje}</span>
                </p>
            </li>
        `;
    });

    ulMensaje.innerHTML = mensajesHtml;
}
txtMensaje.addEventListener('keyup',({keyCode})=>{

    const mensaje = txtMensaje.value;
    const uid = txtMensaje.value;
    if(keyCode !== 13){ return; }
    if(mensaje.length === 0){ return; }

    socket.emi('enviar-mensaje', { mensaje, uid });

    txtMensaje.value='';

})

const main = async() =>{

    //validar JWT
    await validarJWT();

}


main();
//const socket = io();

