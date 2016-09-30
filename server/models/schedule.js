'use strict';

module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define('Schedule', {
        name: DataTypes.STRING,
        repeat: DataTypes.BOOLEAN
    },{
        classMethods: {
            associate: function(models) {
                Schedule.hasMany(models.Nut),
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