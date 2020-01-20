var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var db = new sqlite3.Database('LINE.db')

app.get('/', function (req, res, next) {
    var query = "\
<<<<<<< HEAD
        SELECT m.message_content,u.user_name\
        FROM message m,user u\
        WHERE m.recipient_id = 2 and m.id1=u.id1\
=======
        SELECT group_name\
        FROM 'group'\
        WHERE member_id = 3\
>>>>>>> origin/master
        ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

