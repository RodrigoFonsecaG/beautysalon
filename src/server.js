const express = require('express');
const server = express();

const nunjucks = require('nunjucks');
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//Configura pasta publica para quesempre que no código tiver 
//referência a uma imagem por exemplo, 
//o servidor sabe que precisa ir buscar para o diretório que foi configurado.
server.use(express.static("public"));


//Configura caminho para a pagina principal
//Usar sendFile para enviar os arquivos html
server.get("/", (req, res) => {
    return res.render("index.html")   
})

//Configura caminho para a pagina de agendamento
server.get("/make-an-appointment", (req, res) => {
    return res.render("make-an-appointment.html")
})


//Liga o servidor
server.listen(3000);
