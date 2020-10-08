const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create collection and schema
const  SurveySchema = new Schema(  {
    title: [Schema.Types.String],
    questions: [Schema.Types.Array]
// https://stackoverflow.com/questions/28166463/how-to-create-mongoose-schema-dynamically
},{strict:false});

const Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;


