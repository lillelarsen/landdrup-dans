const db = require('../config/database')();

module.exports = function (app) {
    app.get('/profile',function (req,res) {
   
    const sql = `SELECT class.id, style.title, levels.name AS level, age_group.name AS age FROM class
    INNER JOIN style ON class.fk_styles = style.id
    INNER JOIN levels ON class.fk_levels = levels.id
    INNER JOIN age_group ON class.fk_age_group = age_group.id
    INNER JOIN class_user ON class_user.class_id = class.id
    WHERE class_user.user_id = ?`;

        db.query(sql, [req.session.user], function (err, classes) {
            if (err) return res.send(err);
            db.query(`SELECT first_name, last_name, address, zip_code, city, phone, students, fk_user FROM users_info WHERE fk_user = ?`, [req.session.user], function (err, userInfo) {
                if (err) return res.send(err);
                res.render('profile', {'title': 'Hold', 'classes': classes, 'userInfo': userInfo } );
            });
        });
    });
//Her skal men kunne redigere sin profil
    app.patch('/profile', (req, res) => {
		db.query(`UPDATE landdrupdb.users_info SET first_name = ?, last_name = ?, address = ?, zip_code = ?, city = ?, phone = ?, students = ? WHERE id = ?`,
		[req.body.firstname, req.body.lastname, req.body.address, req.body.zipcode, req.body.city, req.body.phone, req.body.students, req.body.id], (err, results) => {
			if (err) return res.send(err);
			res.status(200);
			res.end();
		});
		console.log(req.body);
	});

    //Her skal man kunne slette et hold på sin brugerprofil
    //Fra profile.ejs sender vi req.params.id som kommer fra adresselinien. req.session.user er = brugeren som er logget ind.
    app.delete('/profile/:id', function (req, res, next) {
        console.log(req.params.id);
        console.log(req.session.user);
        db.query(`DELETE FROM class_user WHERE user_id = ? AND class_id = ?`, [req.session.user, req.params.id], function(err, results) {
            if (err) return res.send(err);
            res.status(200);
            res.end();
        });
    });
};

