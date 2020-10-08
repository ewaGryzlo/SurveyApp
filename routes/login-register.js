if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const passport = require ('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const initializePassport = require( '../config/passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);
const users =[]; //local variable ,empty array

router.get('/login', (req, res) => {
    console.log(req.session);
    res.render('login.ejs',{
        pageTitle: 'Signup',
        isAuthenticated: false
    })
});

router.post('/login', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then (user=>{
            if (!user){
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch  => {
                if(doMatch){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
});

router.get('/register', (req, res) => {
    res.render('register.ejs',{
        path: '/register',
        pageTitle: 'Register',
        isAuthenticated: false
    });
});

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const email = req.body.email;
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/register');
            }
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword

            });
            return user.save();
        })
        .then(result => {
            console.log(result);
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/register');
        });

});


router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
});

module.exports = router;





