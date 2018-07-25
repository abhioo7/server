const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Scheme_Schema = new Schema({
    Name: {
        type: String
    },
   
    Launched: {
        type: String
    },
    Budget:{
       type:String
    }
   
}, {
    timestamps: true
});

var Dishes = mongoose.model('Schema',Scheme_Schema );

module.exports = Dishes;
