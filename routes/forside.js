const db = require('../config/database')();

module.exports = function (app) {
    
    app.get('/', (req, res) => {
        db.query(`SELECT * FROM landdrupdb.frontpage_content`, (err, results) => {
            if (err) res.send(err);
            res.render('forside', { 'title': 'Velkommen til Landdrup Dans!', 'results': results });
	    })
    });
};

