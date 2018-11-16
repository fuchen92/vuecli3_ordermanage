var express = require("express")
var app = express()
var router = express.Router()

var db = require("./db.json")

router.get("/", function(req, res) {
	res.send("Hello world")
})

// mock假数据
router.get("/api/activity/:mobile", function(req, res, next) {
	// 响应mock数据
	res.json(db)
})
router.get("/api/activity/", function(req, res, next) {
	// 响应mock数据
	res.json(db)
})

app.use("/src/assets", express.static("../src/assets"))

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

app.use(router)

app.listen(8081, function() {
	console.log("server listenning on port 8081")
})
