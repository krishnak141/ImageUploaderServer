const express = require('express')
const bodyParser = require('body-parser')
const cors=require('./cors');

const Files = require('../models/files');

const filesRouter = express.Router();


filesRouter.use(bodyParser.json());


filesRouter.route('/')
    .options(cors.corsWithOptions,(req,res)=>{
        res.sendStatus(200);
    })
    .get(cors.cors,(req, res, next) => {
        Files.find()
            .then((files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(files)
            },
                (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        Files.create(req.body)
            .then((file) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(file)
            },
                (err) => next(err)
            )
            .catch((err) => next(err))
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /files');
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /files');
    });

// Parsing Params
filesRouter.route("/:fileId")
.options(cors.corsWithOptions,(req,res)=>{
    res.sendStatus(200);
})
.delete(cors.corsWithOptions, (req, res, next) => {
    console.log(req.params.id)
    Files.findByIdAndRemove({"_id": req.params.fileId})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.json(resp);
        },
            (err) => next(err))
        .catch((err) => next(err))
})

module.exports = filesRouter