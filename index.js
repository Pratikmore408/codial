const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// console.log(process.env);

const MongoStore = require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customWare = require('./config/middleware');

// setup the chat server to be use with express

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

if(env.name == 'development'){
	app.use(sassMiddleware({
		src: path.join(__dirname, env.asset_path, 'scss'),
		dest: path.join(__dirname, env.asset_path, 'css'),
		debug: true,
		outputStyle: 'extended',
		prefix: '/css'
	}));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
// make the uplodes path available to browser
app.use('/uplodes', express.static(__dirname + '/uplodes'));

app.use(logger(env.morgan.mode, env.morgan.options));


app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
const store = MongoStore.create(
	{
		mongoUrl: `mongodb://127.0.0.1/${env.db}`,
		autoRemove: "disabled",
	},

	async (err) => {
		await console.log(err || "connection is connected in mongoes ok");
	}
);

//middleware for the  passportJs Encrypted file converted
app.use(
	session({
		name: "codial",
		//alter todo change
		secret: env.session_cookie_key,
		// secret: "anything",
		saveUninitialized: false,
		resave: false,
		cookies: {
			maxAge: 1000 * 60 * 100,
		},
		store: store,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
