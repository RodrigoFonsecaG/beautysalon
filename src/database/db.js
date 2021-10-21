const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;


// 1 - Criando tabela
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS schedule(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        tel TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        date TEXT,
        time TEXT,
        services TEXT,
        total TEXT
    );
    `);
});






//4 - Deletar dados da tabela
/*db.all(`DELETE FROM schedule WHERE id=?`,[1], function(err){
    if(err){
        return console.log(err)
    }
    console.log("Registro deletado com sucesso!")
})*/








