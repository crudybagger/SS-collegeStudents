// Roll schema with 1  text feild

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RollSchema = new Schema({
    roll: {
        type: String,
        required: true
    }
});

module.exports = Roll = mongoose.model('roll', RollSchema);