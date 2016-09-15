'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/yostorm-test'
  },

  postgres: {
          uri: process.env.POSTGRES_URL ||
         'postgres://user:pass@localhost:5432/mytest'
  },
  database: 'mytest',
  username: 'rich.johnson',
  password: 'root'
};