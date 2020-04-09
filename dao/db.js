
var express=require('express');
var app=express();
var mongoose=require('mongoose');
var User=require('../model/User.js')
var bodyParser=require('body-parser');
//var cors=require('cors');
//var request=require('request');
var dotenv=require('dotenv')

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var host=process.env.host;
var port=process.env.port;
var dbname=process.env.dbname;
var dburl=process.env.dburl;
console.log('dbname'+dburl);

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
console.log('db connected');

//var personSchema=mongoose.Schema({name:String,age:String});
//var Person=mongoose.model('Persons',personSchema,'Persons');

// insert document

exports.registerUser=function(req,res){
	console.log(req.body.name);
    var UserObj=new User({name:req.body.name,password:req.body.password,email:req.body.email,phone_number:req.body.phone_number,photo:req.body.photo,role:req.body.role});
    UserObj.save(function(err,response){
        if(err) console.log(err);
	});
};
/*
exports.authenticateUser=function(req,res){
console.log('user login'+req.body.email);
User.find({email:req.body.email,password:req.body.password},{role:1},function(err,output){
console.log(''+output);
        if(output.length==0 ){
        return{ valid: false,status:200,role:'',message: 'Invalid credentials !'};
		console.log('login failed');
		}
		else{
			  return{ valid:true,status:200,role:output,message: 'success !'};
			  console.log('login success');
		}
    });	
};*/
  

exports.authenticateUser=function(req,res){
console.log('user login'+req.body.email);
User.find({email:req.body.email,password:req.body.password},{role:1},function(err,output){
console.log(''+output);
        if(output.length==0 ){
        return{ valid: false,status:200,role:'',message: 'Invalid credentials !'};
		console.log('login failed');
		}
		else{
			  return{ valid:true,status:200,role:output,message: 'success !'};
			  console.log('login success');
		}
    });	
};