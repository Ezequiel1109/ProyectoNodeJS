const nomre ='nombre';
const real = 'bueno';

const normal = nombre + ' ' + real;
//caso 1
const template = `felipe feliz`;
//caso 2
const template = `${ 1 + 1 } Herrera`;
//caso 3
const template = `${ nombre } ${ real }`;

console.log(normal);
console.log(template);

const html =`
<h1>hola</h1> 
<p>mundo</p>`;

console.log(html);