const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//DB Config
require('./config/db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const poll = require('./routes/poll');
const homepageRoutes = require('./routes/homepage');
const surveyRoutes = require('./routes/survey');
const surveyRoutes2 = require('./routes/survey2');
const exampleRoutes = require('./routes/example');


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

const port = 3000;
app.listen(port, function () {
  console.log(`Server listening on port : ${port}`);
});