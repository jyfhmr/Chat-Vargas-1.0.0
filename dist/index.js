

var _express = _interopRequireDefault(require("express"));
var _socket = require("socket.io");
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//*6

var app = (0, _express["default"])();
app.set('port', process.env.PORT || 3000);
var server = _http["default"].createServer(app);
var io = new _socket.Server(server);
app.use(_express["default"]["static"](__dirname + "/public"));
io.on('connection', function (socket) {
  socket.on('messageToServer', function (data) {
    socket.emit('messageToOperador', data); //se lo envio al mismo que lo envio no es importante

    io.emit('messageToAdmin', data); // este si va al admin
  });

  //Recibes la respuesta del admin y la mando al paciente

  socket.on('AnswerFromAdmin', function (data) {
    io.emit('AnswerFromAdmin', data); //io para que llegue a todos
  });
  // ---------------------------------------------
});

server.listen(app.get('port'));
console.log('server on port 3000');