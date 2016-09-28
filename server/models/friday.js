'use strict';

module.exports = function(sequelize, DataTypes) {
    var Friday = sequelize.define('Friday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Friday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Friday;
};