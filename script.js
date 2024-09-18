var cartas = [];
var paginaActual = 0;
var contador=parseInt(0);

var nombreFin=[];
var precioFin=[];
var cantidadesFin=[];
    
const cartasPorPagina = 16;

    
function cargarJSON() {
  let rutaJSON = 'data/cartas2.json';

  fetch(rutaJSON)
    .then(response => response.json())
    .then(data => {
      cartas = data;
       mostrarCartas();
    })
   .catch(error => console.error('Error al cargar el JSON:', error));
}

function mostrarCartas() {
  let cartasHTML = [];
  const inicio = paginaActual * cartasPorPagina;
  const fin = inicio + cartasPorPagina;
  const cartasPagina = cartas.slice(inicio, fin);

  cartasPagina.forEach(carta => {
    let imagen = carta.image_uris.normal;
    let nombre = carta.name;
    let idioma = carta.lang;
    let ano = carta.released_at;
    let expansion = carta.type_line;
    let descripcion = carta.oracle_text;
    let colecionNum = carta.collector_number;
    let precio = carta.prices.eur;
    
    const cartaHTML = `
      <div class="card">
        <img src="${imagen}" alt="${nombre}">
        <h2>${nombre}</h2>
        <h3>Descripción:</h3>
        <p><strong>Tipo:</strong> ${expansion}</p>
        <p>${descripcion}</p>
        <p><strong>Idioma:</strong> ${idioma}</p>
        <p><strong>Año:</strong> ${ano}</p>
        <p><strong>Número de Colección:</strong> ${colecionNum}</p>
        <p><strong>Precio:</strong> ${precio}</p>
        <button onclick="agregarCarrito('${nombre}',${precio})">Comprar</button>
      </div>
    `;
    cartasHTML.push(cartaHTML);
  });

  document.getElementById('cartas').innerHTML = cartasHTML.join('');
  actualizarBotones();
}

function cambiarPagina(direccion) {
  paginaActual += direccion;
  mostrarCartas();
}

function actualizarBotones() {
  document.getElementById('prev').disabled = paginaActual === 0;
  document.getElementById('next').disabled = (paginaActual + 1) * cartasPorPagina >= cartas.length;
}

function actualizarContadorCarrito(numCartas) {
  document.getElementById('comprasId').textContent = numCartas;
}

function agregarCarrito(nombre,precio) {
  let control = false;
  for (let i = 0; i < contador; i++) {
    if (nombre === nombreFin[i]) {
      cantidadesFin[i]++;
      control = true;
    }
  }

  if(!control){
    nombreFin.push(nombre);
    precioFin.push(parseFloat(precio));
    cantidadesFin.push(1);
  }
  contador++;
  actualizarContadorCarrito(contador);
}

function limpiarArrays(){
  for(let i=0;i<contador;i++){
    nombreFin.splice(0, nombreFin.length);
    precioFin.splice(0, precioFin.length);
    cantidadesFin.splice(0, cantidadesFin.length)
  }
}

function mandar() {
  var url = 'tiket/tiket';
  localStorage.setItem('nombreFin', JSON.stringify(nombreFin));
  localStorage.setItem('precioFin', JSON.stringify(precioFin));
  localStorage.setItem('cantidadesFin', JSON.stringify(cantidadesFin));
  localStorage.setItem('contadorFin', JSON.stringify(contador));
  
  limpiarArrays()
  contador = 0;
  actualizarContadorCarrito(contador);
  return url;
}


function mostrarBusqueda(cartasFiltradas) {
  let cartasHTML = [];

  cartasFiltradas.forEach(carta => {
    let imagen = carta.image_uris.normal;
    let nombre = carta.name;
    let idioma = carta.lang;
    let ano = carta.released_at;
    let expansion = carta.type_line;
    let descripcion = carta.oracle_text;
    let colecionNum = carta.collector_number;
    let precio = carta.prices.eur;

    const cartaHTML = `
    <div class="card">
      <img src="${imagen}" alt="${nombre}">
      <h2>${nombre}</h2>
      <h3>Descripción:</h3>
      <p><strong>Tipo:</strong> ${expansion}</p>
      <p>${descripcion}</p>
      <p><strong>Idioma:</strong> ${idioma}</p>
      <p><strong>Año:</strong> ${ano}</p>
      <p><strong>Número de Colección:</strong> ${colecionNum}</p>
      <p><strong>Precio:</strong> ${precio}</p>
      <button onclick="agregarCarrito('${nombre}',${precio})">Comprar</button>
    </div>
    `;
    cartasHTML.push(cartaHTML);
  });

  document.getElementById('cartas').innerHTML = cartasHTML.join('');
  actualizarBotones();
}

window.onload = cargarJSON;

function buscarCartas() {
  const textoBusqueda = document.getElementById('bucador').value.toLowerCase();
  const cartasFiltradas = cartas.filter(carta => carta.name.toLowerCase().includes(textoBusqueda));
  mostrarBusqueda(cartasFiltradas);
}
