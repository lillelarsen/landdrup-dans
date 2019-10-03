const db = require('../config/database')()

module.exports = function (app) {
	app.get('/style',function (req,res) {
		db.query(`SELECT * FROM landdrupdb.style;`, function (err, results) {
				if (err) res.send(err);
				res.render('style', {'title': 'produkter', 'results': results} );
			});
		});

	app.get('/instructor',function (req,res) {
		db.query(`SELECT instructors.name, instructors.description, instructors.picture FROM landdrupdb.instructors;`, function (err, results) {
				if (err) res.send(err);
				res.render('instructor', {'title': 'produkter', 'results': results} );
			});
		});

	// Tilmeldings route 
	app.get('/tilmelding', function (req, res) {
		db.query(`SELECT class.id, class.price, style.title AS style_title, age_group.name AS age_name, levels.name AS level_name, instructors.name AS instructor_name 
		FROM landdrupdb.class
		INNER JOIN landdrupdb.style ON class.fk_styles = style.id
		INNER JOIN landdrupdb.age_group ON class.fk_age_group = age_group.id
		INNER JOIN landdrupdb.levels ON class.fk_levels = levels.id
		INNER JOIN landdrupdb.instructors ON class.fk_instructor = instructors.id ORDER BY fk_styles, (CASE LEVEL_NAME WHEN 'Begynder' THEN 1 WHEN 'øvet' THEN 2 WHEN 'elite' THEN 3 ELSE 100 END)`, function(err, results) {
			if (err) res.send(err);
			res.render('tilmelding', {'title': 'hold', 'results': results} );
		});
	});

	 app.post('/tilmelding', function (req, res) {
		 console.log(req.session)
        db.query(`INSERT INTO class_user (class_id, user_id) SELECT ?,? FROM class_user WHERE NOT EXISTS (SELECT id from class_user WHERE class_id = ? AND user_id = ?) LIMIT 1`,
        [req.fields.id, req.session.user, req.fields.id, req.session.user],  (err, results) => {
        	console.log(req.fields.id)
            if (err) res.send(err);

            res.redirect('/profile');
        });
    });


	// Viser mere information omrking hver enkelt stilart
	app.get("/style/:id", function(req, res){
		db.query(`SELECT * FROM landdrupdb.style WHERE id = ?`,[req.params.id],  function(err, results) {
			if (err) res.send(err);
			console.log(results[0]);
			res.render("show", {'title': 'stilart', 'results': results[0]});
		});
	});

};



