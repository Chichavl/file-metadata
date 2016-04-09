'use strict';

var path = process.cwd();

module.exports = function (app, upload) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/file')
		.post(function(req, res){
			upload(req,res,function(err) {
	        if(err) {
	            console.log(err);
	            return res.end("Error uploading file.");
	        }
	        res.json({size:req.file.size});
    		});
		});
};