var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var activityScheMa = new Schema({
	shopid:String,
	shopname:String,
	shopheadimg:String,
	activitycontent: [],
	coverimg: String,
	posttime:String,
	statics:{
		watches:Number,
		collections:[],
		likes:[],
		comments:[{
			speaker: String,
			accept: String,
			content: String
		}]
	}
},function(){
	
});	//	定义了一个新的模型，但是此模式还未和users集合有关联
var activity = mongoose.model('activities', activityScheMa); //	与users集合关联
module.exports = activity;
