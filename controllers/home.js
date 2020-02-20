var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('/', function(req, res){
	if(req.cookies['username'] != null){
		
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){

	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.get('/delete/:id', function(req, res){
 	var id = req.params.id;
	userModel.delete(id,function(result){
		if(result){
			res.redirect('../alluser');
		}else{
			res.send('invalid username/password');
		}
	});
});

router.get('/update/:id', function(req, res){
	var id=req.params.id;
	userModel.getById(id,function(results){
		if(results!=null){
			res.render('home/update', {old: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.post('/update/:id', function(req, res){
	var user={
		id:req.params.id,
		uname:req.body.uname,
		password:req.body.password,
		type:req.body.type
	};
	userModel.update(user,function(results){
		if(results){
			res.redirect('../alluser');
		}else{
			res.send('invalid username/password');
		}
	});
});

module.exports = router;

