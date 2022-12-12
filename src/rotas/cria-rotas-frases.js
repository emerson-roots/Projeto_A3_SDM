import sgdb from '../../database/sgdb.js'
import auth from '../auth.js'
import sqlite3 from 'sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../../database/frase.db3')

var db = new sqlite3.Database(file);

// cria database
db.run('CREATE TABLE IF NOT EXISTS frase(texto TEXT, autor TEXT)');

// fonte crud:
// https://medium.com/swlh/creating-a-crud-application-using-node-js-and-sqlite3-a57d4a39ab69
// https://github.com/souvik-pl/basicCRUDops_NodeJs_sqlite
function cria_rotas_frases(app, nome_rota, nome_base) {


    // SQLITE
    app.get(nome_rota, function (req, res) {
        db.all('SELECT * FROM frase', [], (err, rows) => {
            if (err) {
                throw err;
            }

            // ITERAR
            // rows.forEach((row) => {
            //     console.log(row.texto);
            // });

            let json = rows;
            res.json(json)
        });

    })

    // POST nova pergunta com AUTH/TOKEN
    app.route(nome_rota).post(auth.middlewareAuth, function (req, res) {

        // insere
        db.serialize(() => {
            db.run('INSERT INTO frase(texto,autor) VALUES(?,?)', [req.body.texto, req.body.autor], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                res.send("Registro inserido com sucesso!");
            });

        });
    })

    function fecharDatabase() {
        // fecha conexao DB
        //  db.close((err) => {
        //     if (err) {
        //         // res.send('There is some error in closing the database');
        //         return console.error(err.message);
        //     }
        //     console.log('Closing the database connection.');
        //     // res.send('Database connection successfully closed');
        // });
    }

    function getById() {
        // get by ID
        // db.serialize(() => {
        //     db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.params.id], function (err, row) {     //db.each() is only one which is funtioning while reading data from the DB
        //         if (err) {
        //             res.send("Error encountered while dislaying");
        //             return console.error(err.message);
        //         }
        //         res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
        //         console.log("Entry dislayed successfully");
        //     });
        // });
    }

}

export default cria_rotas_frases 