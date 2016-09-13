'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/yostorm-dev'
  },

  seedDB: true
  
// Postgres connection options
  postgres: {
          uri: process.env.POSTGRES_URL ||
         'postgres://user:pass@localhost:5432/testDB'
  },
  database: 'todo',
  username: 'rich.johnson',
  password: 'root',
  seedDB: true
  };
};
