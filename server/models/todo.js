'use strict';

module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        name: DataTypes.STRING,
        complete: DataTypes.BOOLEAN,
        foo: DataTypes.STRING,
        stormId: DataTypes.STRING
    });
    return Todo;
};