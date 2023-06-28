const mongoose = require('mongoose');

const Favourite = new mongoose.Schema({
    user_id:{
        type:String,
        require:true,
    },
    project_id:{
        type:Number,
        require:true
    },
}, 
{timestamps:true}); 

module.exports = mongoose.model("Favourites",Favourite);