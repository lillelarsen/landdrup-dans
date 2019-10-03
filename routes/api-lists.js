const db = require('../config/database')();

module.exports = function (app) {

	app.get('/api/styles', (req, res) => {
		db.query(`SELECT style.title AS name, style.id AS id
			FROM landdrupdb.style`, (err, results) => {
		if (err) res.send(err);
		res.json(results);
		})
	});
	app.get('/api/ageGroups', (req, res) => {
		db.query(`SELECT age_group.name AS name, age_group.id AS id
			FROM landdrupdb.age_group`, (err, results) => {
		if (err) res.send(err);
		res.json(results);
		})
	});
	app.get('/api/levels', (req, res) => {
		db.query(`SELECT levels.name AS name, levels.id AS id
			FROM landdrupdb.levels`, (err, results) => {
		if (err) res.send(err);
		res.json(results);
		})
	});
	app.get('/api/instructors', (req, res) => {
		db.query(`SELECT instructors.name AS name, instructors.id AS id
			FROM landdrupdb.instructors`, (err, results) => {
		if (err) res.send(err);
		res.json(results);
		})
	});
};
