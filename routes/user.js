
/*
 * GET users listing.
 */

exports.users = function(db) {
	return function(req, res) {
		db.collection('users').find().toArray(function(err, items){
			res.json(items);
		})
	}
};

/*
 * Post to adduser.
 */

exports.adduser = function(db) {
	return function(req, res) {
		db.collection('users').insert(req.body, function(err, result){
			res.send(
				(err === null) ? {msg: ''} : {msg: err}
				);
		});
	}
};