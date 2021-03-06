var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FirstBlood');

var db = mongoose.connection;

db.on('error', (err) => {
	console.log(err);
});

db.once('open', (callback) => {
	console.log('ok');
});

var kittySchema = mongoose.Schema({
	name: String,
	age: Number,
	arr: Array
});

kittySchema.set('autoIndex', false);

kittySchema.index({name: 1});

kittySchema.methods.speak = function() {
	var name = 'My name is ' + this.name;
	console.log(name);
};

kittySchema.statics.findByName = function(name, callback) {
	this.find({name: new RegExp(name, 'i')}, callback);
};

var kittyModel = mongoose.model('Kitten', kittySchema);

// var xyx = new kittyModel({
// 	name: 'xieyuxiao',
// 	age: 26
// });

// var datou = new kittyModel({
// 	name: 'datou',
// 	age: 25
// });

// xyx.save((err, self) => {
// 	if (err) return console.error(err);
// 	self.speak();
// });

// datou.save((err, self) => {
// 	if (err) return console.error(err);
// 	self.speak();
// });

// var hxy = new kittyModel({
// 	name: 'hxy',
// 	age: 16
// });

// hxy.save((err, self) => {
// 	if (err) return console.error(err);
// 	self.speak();
// });

kittyModel.find({name: 'datou'}, (err, self) => {
	if (err) return console.error(err);
	console.log(self);
});

// kittyModel.findByName('xieyuxiao', function(err, target) {
// 	if (err) return console.error(err);
// 	console.log(target);
// });

kittyModel.findOne({name: 'xieyuxiao'}, (err, user) => {
	if (!err) {
		console.log(user);
	}
});

// kittyModel.findById(ObjectID); 根据ObjectId查找到唯一实例

kittyModel
	.find()
	.where('age').gte(25)
	.sort('age')
	.select('_id name')
	.exec((err, users) => {
		console.log(users);
	});
// console.log(xyx);