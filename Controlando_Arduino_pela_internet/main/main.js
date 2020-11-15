/*ESSE É O BACK, DIGA OLÁ PARA O BACK
AQUI ESTÁ SENDO CONFIGURADO O SERVIDOR, AS PARTES DE CONEXÕES

*/
const SerialPort = require('serialport'); //importar bibilioteca
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

//SERVIDOR
const app = express();
const server = http.createServer(app);

app.use(express.static('public')); // add arquivos estáticos

app.get('/', (req, res, next) => {
    res.sendfile(__dirname + '/public/index.html') // fala qual é a pag web
});

server.listen(9999, ()=>{
    console.log('Porta 192.168.1.100: %d', server.address().port) //definindo nosso endereço e referenciando a porta
});

const io = socketIo.listen(server);

//COMUNICAÇÃO COM A SERIAL
const Readline = SerialPort.parsers.Readline; //ler linha que vem pela serial
const parser = new Readline({delimiter: '\r\n'}); //decodifica os HEX em int, string...
const mySerial = new SerialPort("COM5", {
    baudRate: 9600,
}); //informa a porta e o begin

mySerial.pipe(parser); //o pipe informa o parser

mySerial.on('open', function(){//"liga" o serial
    console.log('CONEXÃO SERIAL INICADA');
    parser.on('data', function(data){
        console.log(data);
        //var dado = parseInt(((data*100)/1023));
        //console.log(dado);
        //io.emit('serial:data', {
            //value: dado.toString()
        //});
    });
});


//recebendo dados da web e passando p/ serial
io.sockets.on('connection', function(socket){
    console.log('UM NOVO NÓ FOI CONECTADO');

    socket.on('btnAction', function(btn){
        var dado_web = btn.value;
        console.log(dado_web);
        mySerial.write(dado_web);
        console.log('ENVIANDO " ' + dado_web + '" PARA SERIAL' );
    });
});