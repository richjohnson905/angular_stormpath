'use strict';

module.exports = function(sequelize, DataTypes) {
    var Wednesday = sequelize.define('Wednesday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Wednesday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Wednesday;
};