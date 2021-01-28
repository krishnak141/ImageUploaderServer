const mongoose=require('mongoose');
const Schema=mongoose.Schema

const fileSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    original_name:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


var files=mongoose.model('File',fileSchema)

module.exports=files