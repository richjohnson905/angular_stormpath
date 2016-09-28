'use strict';

module.exports = function(sequelize, DataTypes) {
    var Saturday = sequelize.define('Saturday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Saturday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Saturday;
};