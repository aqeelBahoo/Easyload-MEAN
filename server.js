var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("easyload", []);
var bodyparser = require("body-parser");
app.use(express.static(__dirname  + "/public"));
app.use(bodyparser.json());

//get all data
app.get("/easyloadList", function(req, res){
	db.easyloadList.find(function(err, docs){
		if(err){
			console.log(err)
		}else{
			res.json(docs);
			console.log(docs);
		}

	})
});

//post data
app.post("/easyloadList", function(req, res){
	db.easyloadList.insert(req.body, function(err, doc){
		res.json(doc);
		console.log( "easyload  " + doc);
	})
})

// get one data
app.get("/easyloadList/:id", function(req, res){
	var id = req.params.id;
	db.easyloadList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
		console.log(doc);
	})
})

//app.get("/easyloadList/vendor/:name", function(req, res){
//	var name = req.params.name;
//	db.easyloadList.find({vendor: name}, function(err, doc){
//		res.json(doc);
//		console.log(doc);
//	})
//})

//put data
app.put("/easyloadList/:id", function(req, res){
	var id = req.params.id;
	db.easyloadList.findAndModify({
				query: {_id: mongojs.ObjectId(id)},
				update: {
					$set: {
						number: req.body.number,
						rupees: req.body.rupees
					}
				},
				new : true
			},
			function(err, doc){
				res.json(doc);
			})
})

//delete one data
app.delete("/easyloadList/:id", function(req, res){
	var id = req.params.id;
	db.easyloadList.remove({_id : mongojs.ObjectId(id)},function(err, doc){
		res.json(doc);
		console.log("doc" + doc)
		console.log("err " + err)
	});

})

app.listen(3000);
console.log("server start running");