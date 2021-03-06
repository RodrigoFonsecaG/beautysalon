const express = require('express');
const server = express();

const db = require('./database/db.js');

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true
});

//Configura pasta publica para quesempre que no código tiver
//referência a uma imagem por exemplo,
//o servidor sabe que precisa ir buscar para o diretório que foi configurado.
server.use(express.static('public'));

//habilitar uso req.body
server.use(express.urlencoded({ extended: true }));

//Configura caminho para a pagina principal
//Usar sendFile para enviar os arquivos html
server.get('/', (req, res) => {
  return res.render('index.html');
});

//Configura caminho para a pagina de agendamento
server.get('/make-an-appointment', (req, res) => {
  return res.render('make-an-appointment.html');
});

server.post('/save-appointment', (req, res) => {
  //2- Inserir dados na tabela
  const query = `
INSERT INTO schedule(
    name,
    tel,
    address,
    address2,
    state,
    city,
    date,
    time,
    services,
    total
) VALUES (?,?,?,?,?,?,?,?,?,?)
`;

  const values = [
    req.body.name,
    req.body.telnumber,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.date,
    req.body.time,
    req.body.items,
    req.body.total
  ];

  function afterInsertData(err) {
    if (err) {
      return res.render('make-an-appointment.html', { error: true });
    }
    console.log('Cadastrado com sucesso');
    console.log(this);

    return res.render('make-an-appointment.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {
  const search = req.query.date;

  if (search == '') {
    // pesquisa vazia
    return res.render('appointments.html', { total: 0 });
  }

  db.all(`SELECT * FROM schedule WHERE date = ?`, search, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;

    return res.render('appointments.html', { schedule: rows, total, search });
  });
});

server.post('/delete', (req, res) => {
  const id = req.body.id

  db.all(`DELETE FROM schedule WHERE id=?`, [id], function (err) {
    if (err) {
      return console.log(err);
    }
  });

  return res.render('appointments.html');
});

//Liga o servidor
server.listen(3000);
