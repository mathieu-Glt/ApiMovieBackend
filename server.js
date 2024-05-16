const express = require('express');
const xss = require('xss');
const app = express();
const csrf = require('csrf-token');
const mysql = require('promise-mysql');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const html = xss('<script>alert("xss");</script>')
const database = require('./db/db');
const bodyParser = require('body-parser');
// console.log("🚀 ~ html:", html)
// const xss = require('xss');



//parse les url
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));

// Permission cors
app.use(cors());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});


const config = require('./config')
console.log(' infos config database : ', config);

// console.log("SECRET SECRET CSRF", process.env.SECRET);
// Route de test pour générer le jeton CSRF
app.get('/csrf-token', (req, res, next) => {
	// pass the csrfToken to the view
	csrf.create(process.env.SECRET_CSRF).then(token => {
		console.log(`Look at my fancy CSRF token '${token}'`)
		res.status(200).json({
			status: 200,
			msg: 'Results found',
			csrfToken: token
		})
	
	  })
});


// Analyser les demandes JSON
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// console.log("SECRET", process.env.SECRET);
// console.log("SECRET_CSRF", process.env.SECRET_CSRF);

// configuration du module de session
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 3600000 }
}))

// upload de fichier
app.use(fileUpload({
	createParentPath: true
}));

//parse les url
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));

const errors = { firstName: '', lastName: '', email: '', password: '' };
const obj = {};
console.log("Object.keys", Object.keys(errors));
Object.keys(errors).forEach(key => obj[key] = '');
console.log("obj", obj);

// Middleware qui intercepte toutes les requêtes entrantes et filtre les données du corps de la requête (req.body) afin de protéger contre les attaques XSS (Cross-Site Scripting)
app.use((req, res, next) => {
	for (const key in req.body) {
	  if (Object.hasOwnProperty.call(req.body, key)) {
		req.body[key] = xss(req.body[key]);
	  }
	}
	next();
});

//test de middleware
const myModule = require('./testModule');
// myModule();

// Serve static files from the React app inside build directory
app.use(express.static(path.join(__dirname, 'build')));

setInterval(() => {
    getConnection();
}, 10000)

function getConnection() {
    database.query('SELECT 1', function (error, results, fields) {
        if(error) {
            console.log(`An error occured ${error}`);
            database.end();
        }
        console.log('Connection was successful : ', results);

    })
}


//on check si il l'api est en ligne ou non et on décide quelle bdd on récupère
const tintinRoutes = require('./routes/tintin.routes');
const userRoutes = require('./routes/user.routes');
const favoriesRoutes = require('./routes/favories.routes');
const charactersRoutes = require('./routes/character.routes');
const hergeRoutes = require('./routes/herge.routes');
const authRoutes = require('./routes/authRoutes');
const persoTintinRoutes = require('./routes/persoTintin.routes');
const calendarGoogle = require('./routes/calendarGoogle.routes')

// lecture var. environements fichier .env
// const host = config.db.host;
// const database = config.db.database;
// const user = config.db.user;
// const password = config.db.password;
// const port = config.db.port;

// console.log(host, database, user, password, port)

app.use('/api/users', userRoutes);
app.use('/api/tintins', tintinRoutes);
app.use('/api/favories', favoriesRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/herge', hergeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/persoTintin', persoTintinRoutes);
app.use('/api/calendar', calendarGoogle)

    const PORT = process.env.PORT;
    console.log("🚀 ~ PORT:", PORT)
    app.listen(PORT, () => {
	    console.log('listening port ' + PORT + ' all is ok');
    });


