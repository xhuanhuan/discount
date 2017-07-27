var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var shopScheMa = new Schema({
	masterid:String,
	shopname: String,
	headimg: String,
	coverimg: String,
	location: String,
	activityid: [],
	fans:[]
});	//	定义了一个新的模型，但是此模式还未和shops集合有关联
var shop = mongoose.model('shops', shopScheMa); //	与shops集合关联
module.exports = shop;
