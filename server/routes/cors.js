const express=require('express');
const cors=require('cors');

const app=express();
const whitelist=['http://localhost:3000'];

const corsOptionsDelegate=(req,callback)=>{
    var corsOptions;
    
        corsOptions={origin:true};

    callback(null,corsOptions);
}

exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);