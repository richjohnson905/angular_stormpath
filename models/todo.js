'use strict';

module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        name: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    },{
        classMethods: {
            associate: function(models) {
                Todo.belongsTo(models.Storm, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Todo;
};