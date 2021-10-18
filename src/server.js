const express = require('express');
const server = express();

//Configura pasta publica para quesempre que no código tiver 
//referência a uma imagem por exemplo, 
//o servidor sabe que precisa ir buscar para o diretório que foi configurado.
server.use(express.static("public"));


//Configura caminho para a pagina principal
//Usar sendFile para enviar os arquivos html
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")   
})

//Configura caminho para a pagina de agendamento
server.get("/make-an-appointment", (req, res) => {
    res.sendFile(__dirname + "/views/make-an-appointment.html")
})


//Liga o servidor
server.listen(3000);
