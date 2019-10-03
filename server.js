const app = require('express')();
const debug = require('debug')('kodebase');
const port = process.env.PORT || 1337;

// CONFIG
// ============================================================================
require('./config/index')(app);


// ROUTES
// ============================================================================
require('./routes/index')(app);

// SERVER INIT
// ============================================================================

app.listen(port, () => {
	console.log('this shit works');
});
