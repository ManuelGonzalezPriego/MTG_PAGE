var nombres = [];
var precios = [];
var cantidades = [];
var contador=0;
var fin;

function anadir(){
    nombres = JSON.parse(localStorage.getItem('nombreFin'));
    precios = JSON.parse(localStorage.getItem('precioFin'));
    cantidades = JSON.parse(localStorage.getItem('cantidadesFin'));
    contador=JSON.parse(localStorage.getItem('contadorFin'));

    calcularTotal();
    mostrar();
}

function mostrar(){
    var listaProductos = "";
    for(let i=0; i<contador; i++){
        if(nombres[i]!=undefined){
            listaProductos += "<li>Nombre: " + nombres[i] + ", Precio: " + precios[i] + ", Cantidad: " + cantidades[i] + "</li>";
            total=+precios[i];
        }
    }

    document.getElementById("productos").innerHTML=(listaProductos);

}

function calcularTotal(){
    var total=0;
    for(let i=0; i<contador; i++){
        if(!nombres[i]!=undefined){
            if(precios[i]!=null){
                total += parseFloat(precios[i]*cantidades[i]);
            }
        }
    }
    fin=total.toFixed(2);
    document.getElementById("totalPrecio").innerHTML = total.toFixed(2);    
}

document.getElementById('button').addEventListener('click', function() {
    enviarCorreoConAdjunto();
});


function enviarCorreoConAdjunto() {
    emailjs.init('m5P70IDvTWdIJn2Ve');

    const btn = document.getElementById('button');

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_jqxjm4k';

    const params = {
        from_name: "CART AND TRASH",
        to_name: document.getElementById('emailjs_email').value,
        emailjs_message: "Este es mi correo de contacto, por favor si desea realizar la compra de los productos asignados envíeme el pdf, 'Factura que se le ha descargado', gracias y que Whizart te acompañe... 😊\n Este paso es necesario devido a que somos un pequeño almacen y devemos gestionar nuesto esatoc de esta manera, gracias por la atención 🪄\n Recuerde que el total de su transacción es de:"+fin+"€."
    };

    
    const elemento = document.getElementById('showScroll');
    const opciones = {
        margin: 0.5,
        filename: 'tiket.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(elemento).set(opciones).save().then(() => {
        emailjs.send(serviceID, templateID, params)
            .then(() => {
                btn.value = 'Send Email';
                alert('¡Correo manodado con exito!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });
}

window.onload =anadir();


