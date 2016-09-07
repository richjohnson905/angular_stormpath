
var pg = require('pg');
var client;

if (true) {
	var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
	var client = new pg.Client(connectionString);
	client.connect();
}
else {
	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, theClient) {
	  if (err) throw err;
	  console.log('Connected to postgres! Getting schemas...');
	  client = theClient;
	});
}


