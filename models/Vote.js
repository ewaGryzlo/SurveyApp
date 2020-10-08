const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VoteSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});
<<<<<<< HEAD

=======
>>>>>>> 88ef58257706174692e5344938894e04b0ef851b
//Create collection and schema
const Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;