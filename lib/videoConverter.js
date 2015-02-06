var fs = require('fs');
var child = require('child_process');

var async = require('async');
var uuid = require('uuid');

var types = [{
	  format: 'webm',
	  ffmpegArgs: '" -filter:v "setpts=2.5*PTS" -vcodec libvpx -an "'
	}/*, {
	  format: 'mp4',
	  ffmpegArgs: '" -filter:v "setpts=2.5*PTS" -c:v libx264 -r 30 -an -pix_fmt yuv420p "'
}*/];


var MEDIA_DIR_IN = __dirname + '/../media/input/';
var MEDIA_DIR_OUT = __dirname + '/../media/output/';

// this was changed form jpg to png
var IMAGE_FORMAT = 'png';

var transform = function (media, done) {
	var mediaId = uuid.v4();

	async.map(types, function(type, cb){
		var video = new Buffer(0);
	    var command = [
	        'ffmpeg -i "',
	        MEDIA_DIR_IN + '%d.' + IMAGE_FORMAT,
	        type.ffmpegArgs,
	        MEDIA_DIR_OUT + mediaId + '.' + type.format,
	        '"'
	    ].join('');

	    child.exec(command, { timeout: 3000 }, function (err, stdout, stderr) {
	        if (err) {
	        	console.log('Error: ' + err);
	          	return cb(err);
	        }

	        var filename = MEDIA_DIR_OUT + mediaId + '.' + type.format;
	        var readStream = fs.createReadStream(filename);

	        readStream.on('data', function (chunk) {
	          video = Buffer.concat([video, chunk]);
	        });

	        readStream.on('error', function (err) {
	          done(err);
	        });

	        readStream.on('end', function () {
	        	console.log('transform successful');
		        var base64 = video.toString('base64');
		        done(null, {
		            format: type.format,
		            data: 'data:video/' + type.format + ';base64,' + base64
		        });
	        });
	    });

	}, function (err, results){
		var videos = {};

	    if (err) {
	    	console.log('Error: ' + err);
	    	done(err);
	    }
	    else {
	        results.forEach(function (result) {
	          videos[result.format] = result.data;
	        });
	        done(null, videos);
	    }
	});
};

module.exports = {
	transform: transform
};