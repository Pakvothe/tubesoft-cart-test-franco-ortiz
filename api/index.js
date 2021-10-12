const server = require("./server");
const db = require("./models");
const { conn } = require("./models/index");
var port = process.env.PORT || 3001;

server.listen(port, function () {
	console.log(`Server running on port ${port}`);
});
