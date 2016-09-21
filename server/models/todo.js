'use strict';

module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        name: DataTypes.STRING,
        complete: DataTypes.BOOLEAN,
        stormId: DataTypes.STRING
    });
    return Todo;
};