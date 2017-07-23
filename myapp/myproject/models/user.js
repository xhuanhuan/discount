var mongoose = require("mongoose");
var Schema = mongoose.Schema;	//	创建模型
var userScheMa = new Schema({
	username: String,
	password: String,
	location: String,
	thumbsupid:[],
	activityid: [],
	shopid:[],
	personalinfo:{
		birthday: String,
		sex: String,
		age:Number,
		headimg:String,
		coverimg:String
	},
	myshop:{
		hasshop:Boolean,
		shopid:String
	}
});	//	定义了一个新的模型，但是此模式还未和users集合有关联
var user = mongoose.model('users', userScheMa); //	与users集合关联
module.exports = user;
