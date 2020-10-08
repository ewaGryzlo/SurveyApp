const mongoose = require('mongoose');
const keys = require('./keys');

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect('mongodb+srv://test:test@cluster0-igua4.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));
/*mongoose
    .connect(keys.mongoURI  )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); */