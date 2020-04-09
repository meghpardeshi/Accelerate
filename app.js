var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var cors=require('cors');
var router=require('./route/route.js');
const PORT=8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use((req,res,next)=>{
	console.log('data comming to backend is ',req.body);
	next();
});
app.use('/',router);

app.listen(PORT,(err)=>{
    if(!err)
    console.log('server started on port ',PORT);
    else 
        console.log(err);
});
