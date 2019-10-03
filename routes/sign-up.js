const db = require('../config/database')();

module.exports = function (app) {
    app.get('/sign-up', (req,res) => {
        res.render('sign-up', {'title': 'Registrering', 'content': 'Opret en profil'} );
    });

    app.post('/sign-up', (req, res) => {
        let success = true;
        let errorMessage = '';
        let regexpNavn = /^[A-Za-zæøåÆØÅ ]+$/;
        let regexpAdresse = /^[A-Za-zÆØÅæøå ]+[0-9a-zA-Z]{1,3}$/;
        let regexpMail = /^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-Z0-9_]+?\.[a-zA-Z]{2,3}$/;
        let regexpNummer = /^[0-9]+$/;

        if (req.fields) {
            if (!req.fields.phone || !regexpNummer.test(req.fields.phone) || req.fields.phone.length <= 1) {
                success = false;
                errorMessage = 'Ugyldigt telefonnummer';
            }
            if (!req.fields.city || !regexpNavn.test(req.fields.city) || req.fields.city.length <= 1) {
                success = false;
                errorMessage = 'Ugyldigt bynavn';
            }
            if (!req.fields.zipCode || !regexpNummer.test(req.fields.zipCode) || req.fields.zipCode.length <= 1) {
                success = false;
                errorMessage = 'Ugyldigt postnummer';
            }
            if (!req.fields.address || !regexpAdresse.test(req.fields.address) || req.fields.address.length <= 1) {
                success = false;
                errorMessage = 'Ugyldig adresse';
            }
            if (!req.fields.lastName || req.fields.lastName.length <= 1) {
                success = false;
                errorMessage = 'Ugyldigt navn';
            }
            if (!req.fields.firstName || req.fields.firstName.length <= 1) {
                success = false;
                errorMessage = 'Ugyldigt navn';
            }
            if (!req.fields.username || !regexpMail.test(req.fields.username)) {
                success = false;
                errorMessage = 'Ugyldig e-mail';
            }
        } else {
            success = false;
            errorMessage = 'Alt er galt';
        }

        if (!success) {
            res.redirect('/sign-up')
        }

        if (success) {
            db.query(`INSERT INTO users SET email = ?, password = ?`, [req.fields.username, req.fields.password], function (err, result) {
                if (err) {
                    return res.send(err);
                }
                console.log(req.fields);
                console.log(result);
                db.query(`INSERT INTO users_info SET first_name = ?, last_name = ?, address = ?, zip_code = ?, city = ?, phone = ?, 
                students = ?, fk_user = ?`,
                [req.fields.firstName, req.fields.lastName, req.fields.address, req.fields.zipCode, req.fields.city, req.fields.phone, req.fields.student, result.insertId], (err, results) => {
                    if (err) {
                        return res.send(err);
                    }
                    db.query(`INSERT INTO users_roles SET users_roles.roles_id = ?, users_roles.user_id = ?`,
                    [req.fields.customer, result.insertId], (err, results) => {
                    if (err) {
                        return res.send(err);
                    }
                    res.redirect('/velkommen');
                    });
                });
            })
        }
    });
    app.get('/velkommen', (req,res) => {
        res.render('welcome', {'title': 'Velkommen', 'content': 'Velkommen, log ind herunder'} );
    });
};

//;INSERT INTO users_roles SET users_roles.roles_id = ?, users_roles.user_id = ? 
//req.fields.customer, result.insertId
//res.redirect('/velkommen');
