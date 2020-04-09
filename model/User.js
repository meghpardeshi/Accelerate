const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }, 
	email: { type: String, required: true },
    phone_number: { type: String, required: true }, 
	photo: { type: String, required: false },
    role: { type: String, required: true },
	verified:{type:Boolean,required:false},
	created:{type:Date,required:true},
	photo:{type:String,required:false},
	pancard:{type:String,required:false},
	category: {type: String,required:false},
	subcategory:[Schema.Types.Mixed]
});

module.exports = User = mongoose.model('users', userSchema);


   