var converter = require('./videoConverter');

var processMedia = function (media, callback) {
	converter.transform(media, callback);
};

module.exports = {
	processMedia: processMedia
};