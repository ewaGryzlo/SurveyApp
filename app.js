<<<<<<< HEAD
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const flash = require ('express-flash');
const session = require ('express-session');
const passport = require ('passport');
const methodOverride = require('method-override');
const MongoDBStore= require ('connect-mongodb-session')(session);

const User = require('./models/User');
const csrf = require('csurf');
//crsf token umozliwia przeprowadzenie walidacji requesta kierowanego do naszego serwera - jesli ma wlasciwy token to request zostanie wykonany
//fake strony moga wysylac request do naszego backendu i teoretycznie uzywac naszej sesji (czyli polaczenia klienta z serwerem, np info o byciu zalogowanym
//taki request bez odpowiedniego tokenu sie nie wykona po stronie naszego serwera,token jest zahashowany wiec haker nie ma dop niego dostepu, bo z kazdym requestem/zaladowaniem strony wykoannym przez usera generuje sie nowy token
=======
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
//DB Config
require('./config/db');

const app = express();
<<<<<<< HEAD
const store = new MongoDBStore({
  uri: 'mongodb+srv://test:test@cluster0-igua4.mongodb.net/test?',
  collection: 'sessions'
});
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views');


=======
app.set('view engine', 'ejs');
app.set('views', 'views');
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
const poll = require('./routes/poll');
const homepageRoutes = require('./routes/homepage');
const surveyRoutes = require('./routes/survey');
const surveyRoutes2 = require('./routes/survey2');
const exampleRoutes = require('./routes/example');
<<<<<<< HEAD
const errorController = require('./controllers/error');
const loginRegister = require('./routes/login-register');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //getting info from forms, take these forms from the  password,email etc to access them inside our req var inside of post method
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false ,
  store:store
}));
//app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
});
// app.use((req,res,next)=> {
//     res.locals.isAuthenticated=req.session.isLoggedIn;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//paths
app.use('/poll', poll);
app.use(homepageRoutes);
app.use(surveyRoutes);
app.use(surveyRoutes2);
app.use(exampleRoutes);
app.use(loginRegister);
=======


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));



//paths
app.use('/poll', poll);
app.use('/homepage', homepageRoutes);
app.use(surveyRoutes);
app.use(surveyRoutes2);
app.use(exampleRoutes);
// start server
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;

/*mongodb.connect('mongodb+srv://test:lZ8X2jzlwSzF3TdS@cluster0-igua4.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => {
    console.log('Connected!');
    client.close();
})
    .catch(err => {
        console.log(err);
    });
*/
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b

const port = 3000;
app.listen(port, function () {
  console.log(`Server listening on port : ${port}`);
});