'use strict'

module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define('Event', {
        date: DataTypes.DATE,
        message: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                Event.belongsTo(models.Schedule,{
                    OnDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                }),
                Event.belongsTo(models.Consumer);
            }
        }
    });
    return Event;
}