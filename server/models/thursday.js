'use strict';

module.exports = function(sequelize, DataTypes) {
    var Thursday = sequelize.define('Thursday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Thursday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Thursday;
};