const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const keys = require('../config/keys');
const path = require('path');
const rootDir = require('../util/path');

const Pusher = require('pusher');
const  pusher = new Pusher({
    appId: '994931',
    key: 'fa4b624c85c9403496a1',
    secret: '1be01233050d763c43e5',
    cluster: 'eu',
    useTLS: true,
});




router.get('/', (req,res) => {
    Vote.find().then(votes => res.json({success: true,
        votes: votes}));
});

router.post('/', (req,res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    };
    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
        return res.json({success: true, message: 'thank you for voting'});
    });
});


module.exports = router;
