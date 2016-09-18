'use strict';

module.exports = function(sequelize, DataTypes) {
    var Sunday = sequelize.define('Sunday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Sunday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Sunday;
};