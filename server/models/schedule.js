'use strict';

module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define('Schedule', {
        name: DataTypes.STRING,
        repeat: DataTypes.BOOLEAN
    },{
        classMethods: {
            associate: function(models) {
                Schedule.hasMany(models.Sunday),
                Schedule.hasMany(models.Monday),
                Schedule.hasMany(models.Tuesday),
                Schedule.hasMany(models.Wednesday),
                Schedule.hasMany(models.Thursday),
                Schedule.hasMany(models.Friday),
                Schedule.hasMany(models.Saturday),
                Schedule.belongsTo(models.Provider, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Schedule;
};