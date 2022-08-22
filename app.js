
// elementos del DOM
const texto = document.getElementById('texto');
const respDiv = document.querySelector('#div-resultado');
const resultadoDOM = document.getElementById('resultado');
const btnEncriptar = document.getElementById('btn-encriptar');
const btnDecifrar = document.getElementById('btn-decifrar');
const btnCopiar = document.getElementById('btn-copiar');

// valores de encriptación y codificación
const coded = ['a', 'e', 'i', 'o', 'u'];
const encoded = ['ai', 'enter', 'imes', 'ober', 'ufat'];


/** FUNCIONES PARA ENCRIPTAR */
function letraEncriptada( letra ) {
    for( let j = 0; j < coded.length; j++ ) {
        if( letra === coded[j] ) {
            return encoded[j];    
        }
    }
    return letra;
}

function encriptar( txt ) {
    txt = txt.toLowerCase();
    let msg = '';

    for( let i = 0; i < txt.length; i++ ) {
        msg += letraEncriptada( txt[i] );
    }
    return msg;
}
/** FUNCIONES PARA ENCRIPTAR */



/** FUNCIONES PARA DECIFRAR */
function decifrar( txt ) {
    const palabras = txt.split(' ');
    let mensaje = [];

    for( i = 0; i < palabras.length; i++ ) {
        let nuevaPalabra = reemplazarLetras( palabras[i] );
        mensaje.push( nuevaPalabra );
    }

    const resultado = unirArray( mensaje );

    return resultado;
}

function reemplazarLetras( palabra ) {

    while (
        palabra.includes( encoded[0]) || palabra.includes( encoded[1]) || 
        palabra.includes( encoded[2]) || palabra.includes( encoded[3]) ||
        palabra.includes( encoded[4])    
    ) {
        for (let i = 0; i < coded.length; i++) {
            palabra = palabra.replace( encoded[i], coded[i] );
        }
    }

    return palabra;
}

function unirArray( arr ) {
    let msg = '';

    for (let i = 0; i < arr.length; i++) {
        msg += ' ' + arr[i];
    }

    return msg.trim();
}
/** FUNCIONES PARA DECIFRAR */



function interfaz( msg, valor) {
    let mensaje = '';

    if (valor === 1) {
        mensaje = encriptar( msg );
    } 
    
    if (valor === 2) {
        mensaje = decifrar( msg );
    }

    if ( !document.querySelector('#btn-copiar')) {
        const btn = document.createElement('button');
        
        btn.classList.add('btn-primario');
        btn.setAttribute('id', 'btn-copiar')
        btn.innerText = 'Copiar';
        
        respDiv.appendChild(btn);
    }

    resultadoDOM.innerText = mensaje;
}


/**Interfación con el usuario  */
btnEncriptar.addEventListener('click', function( event ) {
    event.preventDefault();
    const msg = texto.value.trim();
    if ( msg.length > 3 ) {
        interfaz(msg, 1);
    }

});


btnDecifrar.addEventListener('click', function (event) {
    event.preventDefault();
    const msg = texto.value.trim();
    interfaz(msg, 2);
});


respDiv.addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('btn-primario')) {
        resultadoDOM.select();
        document.execCommand('copy');
        alert("Texto copiado!");
        resultadoDOM.innerText = '';
    }
})



/**Interfación con el usuario  */