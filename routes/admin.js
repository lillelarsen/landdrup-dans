const db = require('../config/database')();
const fs = require('fs');

module.exports = function (app) {

	// ADMIN LOGIN
	
	app.get('/login', (req, res) => {
		res.render('partials/login', { 'title': 'Log in'});
	});
	app.post('/login', (req, res) => {
		db.query(`SELECT users.id, roles.name AS role FROM users_roles 
		INNER JOIN users ON users.id = users_roles.user_id
		INNER JOIN roles ON roles.id = users_roles.roles_id
		WHERE users.email = ? AND users.password = ?
		`, [req.fields.username, req.fields.passphrase], (err, result) => {
			if (err) return res.send(err);
			if (result.length === 1) {
				req.session.user = result[0].id;
				req.session.role = result[0].role;

				if (req.session.role == 'Admin')
					res.redirect('/admin');
				else if (req.session.role == 'Instructor')
					res.redirect('/admin/instructors');
				else
					res.redirect('/profile');
			} else {
				res.redirect('/');
			}
		});
	});
	app.get('/logout', (req, res) => {
		req.session.destroy();
		res.redirect('/');
	});
	app.use('/admin', (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/');
			return;
		} else {
			next();
		}
	});


	//admin route
	app.get('/admin', (req,res) => {
		db.query(`SELECT hero_image, header_1, header_2, header_3, text_1, text_2, text_3 FROM landdrupdb.frontpage_content`, (err, results) => {
			if (err) res.send(err);
			res.render('administration/admin', { 'title': 'Admin - Redigér forsiden', 'results': results });
		})
	});

	app.patch('/admin', (req,res) => {
		db.query(`UPDATE frontpage_content SET header_1 = ?, header_2 = ?, header_3 = ?, text_1 = ?, text_2 = ?, text_3 = ?`, 
		[req.fields.head1, req.fields.head2, req.fields.head3, req.fields.text1, req.fields.text2, req.fields.text3 ], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
	});

	app.patch('/admin/picture', (req,res, next) => {
		console.log(req.files.picture)
		db.query(`UPDATE frontpage_content SET hero_image = ?`, 
		[req.files.picture.name ], (err, results) => {
			if (err) {
				return res.send(err);
			}  else if (!req.files || !req.files.picture) {
				return next(new Error('Der var ingen fil med formularen'));
			}
			fs.readFile(req.files.picture.path, (err, data) => {
				if (err) {
					return next(new Error('Den midlertidige fil kunne ikke læses'))
				}
				fs.writeFile(`./public/media/${req.files.picture.name}`, data, (err) => {
					if (err) {
						return next(new Error('Filen kunne ikke gemmes'));
					}
					res.status(200);
					res.end();
				});
			});
			
		});
	});

	//admin instructors route
	app.get('/admin/instructors', (req , res) => {
		db.query(`SELECT landdrupdb.instructors.name, instructors.description, instructors.id, instructors.picture FROM landdrupdb.instructors;`, function(err, results){
			if (err) res.send(err);
			res.render('administration/instructors', {'title': 'Admin - Instruktører', 'results' : results } );
		});
	});

	
	app.post('/admin/instructors', function (req, res, next) {
		db.query(`INSERT INTO landdrupdb.instructors (name, picture, description) VALUES (?, ?, ?)`,
		[req.fields.name, req.files.picture.name, req.fields.description], (err, results) => {
			if (err) {
				return next(err);
			} else if (!req.files || !req.files.picture) {
				return next(new Error('Der var ingen fil med formularen'));
			}
			fs.readFile(req.files.picture.path, (err, data) => {
				if (err) {
					return next(new Error('Den midlertidige fil kunne ikke læses'))
				}
				fs.writeFile(`./public/media/${req.files.picture.name}`, data, (err) => {
					if (err) {
						return next(new Error('Filen kunne ikke gemmes'));
					}
					res.redirect('/admin/instructors');
				});
			});
		})
	});
	app.delete('/admin/instructors/:id', (req, res, next) => {
		db.query(`DELETE FROM landdrupdb.instructors WHERE id = ?`, [req.params.id], (err, results) => {
			if (err) return next(err);
			res.status(200);
			res.end();
		})
	});

	app.patch('/admin/instructors', (req,res) => {
		db.query(`UPDATE landdrupdb.instructors SET name = ?, description = ?, picture = ? WHERE id = ?`,
		[req.body.name, req.body.description, req.body.picture , req.body.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});


	//admin style route
	app.get('/admin/style', (req , res) => {
		db.query(`SELECT landdrupdb.style.id, style.title, style.description, style.picture  FROM landdrupdb.style;`, function(err, results){
			if (err) res.send(err);
			res.render('administration/styles', {'title': 'Admin - Stilarter', 'results' : results } );
		});
	});

	app.post('/admin/style', function (req, res, next) {
		db.query(`INSERT INTO landdrupdb.style (title, picture, description) VALUES (?, ?, ?)`,
		[req.fields.name, req.files.picture.name, req.fields.description], (err, results) => {
			if (err) {
				return next(err);
			} else if (!req.files || !req.files.picture) {
				return next(new Error('Der var ingen fil med formularen'));
			}
			fs.readFile(req.files.picture.path, (err, data) => {
				if (err) {
					return next(new Error('Den midlertidige fil kunne ikke læses'))
				}
				fs.writeFile(`./public/media/${req.files.picture.name}`, data, (err) => {
					if (err) {
						return next(new Error('Filen kunne ikke gemmes'));
					}
					res.redirect('/admin/style');
				});
			});
			
		})
	});
	app.patch('/admin/style', (req, res) => {
		db.query(`UPDATE landdrupdb.style SET title = ?, picture = ?, description = ? WHERE id = ?`,
		[req.fields.name, req.fields.picture.name, req.fields.description, req.fields.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});
	app.delete('/admin/style/:id', (req, res, next) => {
		db.query(`DELETE FROM landdrupdb.style WHERE id = ?`, [req.params.id], (err, results) => {
			if (err) return next(err);
			res.status(200);
			res.end();
		})
	});
	//admin class route
	app.get('/admin/hold', (req , res) => {
		const sql = `SELECT class.id, class.price, style.title AS style_title, age_group.name AS age_name, levels.name AS level_name, 
		instructors.name AS instructor_name, COUNT(class_user.id) as signed
		FROM class
		INNER JOIN style ON class.fk_styles = style.id
		INNER JOIN age_group ON class.fk_age_group = age_group.id
		INNER JOIN levels ON class.fk_levels = levels.id
		INNER JOIN instructors ON class.fk_instructor = instructors.id
		INNER JOIN class_user ON class.id = class_user.class_id
		GROUP BY class_user.class_id`
		db.query(sql, function(err, results){
			if (err) res.send(err);
			res.render('administration/holds', {'title': 'Admin - Hold', 'results' : results } );
		});
	});
	app.post('/admin/hold', function (req, res, next) {
		db.query(`INSERT INTO landdrupdb.class (price, fk_styles, fk_age_group, fk_levels, fk_instructor) VALUES (?, ?, ?, ?, ?)`,
		[req.fields.price, req.fields.style, req.fields.ageGroup, req.fields.level, req.fields.instructor], (err, results) => {
			if (err) {
				return next(err);
			}
			res.redirect('/admin/hold');
		})
	});
	app.patch('/admin/hold', (req,res) => {
		db.query(`UPDATE landdrupdb.class SET price = ?, fk_styles = ?, fk_age_group = ?, fk_levels = ?, fk_instructor = ? WHERE id = ?`, 
		[req.fields.price, req.fields.style, req.fields.ageGroup, req.fields.level, req.fields.instructor, req.fields.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});
	app.delete('/admin/hold/:id', (req, res, next) => {
		db.query(`DELETE FROM landdrupdb.class WHERE id = ?`, [req.params.id], (err, results) => {
			if (err) return next(err);
			res.status(200);
			res.end();
		})
	})

	//admin levels route
	app.get('/admin/niveau',(req, res) => {
		db.query(`SELECT * FROM landdrupdb.levels;`, function(err, results){
			if (err) res.send(err);
			res.render('administration/niveauer', {'title': 'Admin - Niveauer', 'results' : results} );
		});
	});

	app.post('/admin/niveau', function (req, res, next) {
		db.query(`INSERT INTO landdrupdb.levels (name, description) VALUES (?,?)`,
		[req.fields.name, req.fields.description], (err, results) => {
			if (err) {
				return next(err);
			}
			res.redirect('/admin/niveau');
		})
	});
	app.patch('/admin/niveau', (req, res) => {
		db.query(`UPDATE landdrupdb.levels SET name = ?, description = ? WHERE id = ?`,
		[req.fields.name, req.fields.description, req.fields.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});
	app.delete('/admin/niveau/:id', (req, res, next) => {
		db.query(`DELETE FROM landdrupdb.levels WHERE id = ?`, [req.params.id], (err, results) => {
			if (err) return next(err);
			res.status(200);
			res.end();
		})
	});

	//admin age group route
	app.get('/admin/agegroup',(req, res) => {
		db.query(`SELECT * FROM landdrupdb.age_group;`, function(err, results){
			if (err) res.send(err);
			res.render('administration/age_groups', {'title': 'Admin - aldersgrupper', 'results' : results} );
		});
	});

	app.post('/admin/agegroup', function (req, res, next) {
		db.query(`INSERT INTO landdrupdb.age_group (name, description) VALUES (?,?)`,
		[req.fields.name, req.fields.description], (err, results) => {
			if (err) {
				return next(err);
			}
			res.redirect('/admin/agegroup');
		})
	});
	app.patch('/admin/agegroup', (req, res) => {
		db.query(`UPDATE landdrupdb.age_group SET name = ?, description = ? WHERE id = ?`,
		[req.fields.name, req.fields.description, req.fields.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});
	app.delete('/admin/agegroup/:id', (req, res, next) => {
		db.query(`DELETE FROM landdrupdb.age_group WHERE id = ?`, [req.params.id], (err, results) => {
			if (err) return next(err);
			res.status(200);
			res.end();
		})
	});
	//admin users route
	app.get('/admin/users', (req, res) => {
		db.query(`SELECT * FROM landdrupdb.users`, (err, results) => {
			if (err) res.send(err);
			res.render('administration/users', {'title': 'Admin - Brugere', 'results' : results} );
		})
	})
	app.post('/admin/users', (req, res, next) => {
		db.query(`INSERT INTO landdrupdb.users (email, password) VALUES (?,?)`,
		[req.fields.userEmail, req.fields.password], (err, results) => {
			if (err) {
				return next(err);
			}
			res.redirect('/admin/users');
		})
	});
	app.patch('/admin/users', (req, res) => {
		db.query(`UPDATE landdrupdb.users SET email = ?, password = ? WHERE id = ?`,
		[req.fields.email, req.fields.password, req.fields.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});
	app.delete('/admin/users/:id', (req, res, next) => {
		db.query(`DELETE FROM landdrupdb.users WHERE id = ?`, [req.params.id], (err, results) => {
			if (err) return next(err);
			res.status(200);
			res.end();
		})
	});
	
};
