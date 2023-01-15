

var socket = io();
/*
       if (divContenedorDeChats.children[i].textContent == data.idPaciente) { //verifico si ya agregué ese "chat a la lista de chats"

            Agregado = 1 

       }
       else if(Agregado == 0){

           divContenedorDeChats.innerHTML += `<h1>${data.idPaciente}</h1>`
           Agregado = 0

       }
       */
data = {};
var divContenedorDeChats = document.getElementById("divContenedorDeChats");
var DivContenedorDeConversacion = document.querySelector('.DivContenedorDeConversacion');
var ListaDeChats = document.getElementById("DivContenedorDeChatsPacientes");
var form = document.getElementById('form');
var input = document.getElementById("input");
socket.on('messageToAdmin', function (data) {
  var sound = new Audio('./sound.mp4');
  sound.play();
  console.log(data);
  console.log(divContenedorDeChats.children[0].textContent);
  var Agregado = 0;
  for (i = 0; i < DivContenedorDeConversacion.children.length; i++) {
    if (DivContenedorDeConversacion.children[i].children[0].textContent == data.idPaciente) {
      //verifico si ya agregué ese "chat a la lista de chats"

      Agregado = 1;
      var DivChat = document.getElementById("ChatPaciente".concat(data.idPaciente));
      DivChat.innerHTML += "<h2>".concat(data.MessageFromPaciente, "</h2>");

      //Alertar--

      var _Alertador = document.getElementById("SelectorDePacienteNumero".concat(data.idPaciente));
      _Alertador.style.color = "red";

      //Alertar---
    }
  }

  if (!(Agregado == 1)) {
    DivContenedorDeConversacion.innerHTML += "<div id=\"ChatPaciente".concat(data.idPaciente, "\" class=\"ChatDesign\"><h1>").concat(data.idPaciente, "</h1></div>"); //<h1>${data.idPaciente}</h1>
    var _DivChat = document.getElementById("ChatPaciente".concat(data.idPaciente));
    _DivChat.innerHTML += "<h2>".concat(data.MessageFromPaciente, "</h2>");
    ListaDeChats.innerHTML += "<h3>Nuevo Paciente - <a href=\"#ChatPaciente".concat(data.idPaciente, "\" id=\"SelectorDePacienteNumero").concat(data.idPaciente, "\" class=\"Enlaces\">").concat(data.idPaciente, "</a></h3>");
  }
  var Alertador = document.getElementById("SelectorDePacienteNumero".concat(data.idPaciente));
  Alertador.addEventListener("click", function () {
    Alertador.style.color = "white";
  });
});
ListaDeChats.addEventListener("click", function (e) {
  console.log(e);
  console.log(e.target.textContent);
  IdDeClienteDestino = Number(e.target.textContent);
  data.id = IdDeClienteDestino;
});
function appendToDiv(Message) {
  var Mensaje = "<h2 class=\"MessageSent\">".concat(Message, "</h2>");
  var DivQueMeInteresa = document.getElementById("ChatPaciente".concat(data.id));
  DivQueMeInteresa.innerHTML += Mensaje;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  data.message = input.value;
  appendToDiv(input.value);
  socket.emit('AnswerFromAdmin', data);
  input.value = '';
});