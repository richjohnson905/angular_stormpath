'use strict';

module.exports = function(sequelize, DataTypes) {
    var Monday = sequelize.define('Monday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Monday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Monday;
};