

var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var ConversacionContainer = document.getElementById("ConversacionContainer");
var id;
var sound = new Audio('./sound.mp4');
var data = new Object();

//funcion que genera un id

function generarNumeroAlAzar() {
  numero1 = Math.random();
  numero1 = Math.round(numero1 * 10000);
  return numero1;
}
id = generarNumeroAlAzar();

//funcion que genera un id

data.idPaciente = id;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  data.MessageFromPaciente = input.value;
  var MessageToAppend = "<h2 class=\"MyMessages\">".concat(input.value, "</h2>");
  ConversacionContainer.innerHTML += MessageToAppend;
  socket.emit('messageToServer', data);
});
socket.on('messageToOperador', function (data) {
  console.log("el server dice que tu codigo es ", data);
});
socket.on('AnswerFromAdmin', function (data) {
  if (id == data.id) {
    sound.play();
    console.log('esta respuesta es para ti');
    console.log(data.message);
    var MessageFromAdminToAppend = "<div class=\"divContenedorDeMensajeFromAdmin\"><img class=\"Imagenes\" src=\"./logo.jpg\"><h2>".concat(data.message, "</h2></div>");
    ConversacionContainer.innerHTML += MessageFromAdminToAppend;
  } else {
    //console.log("el mensaje no es pa mi")
  }
});