'use strict';

module.exports = function(sequelize, DataTypes) {
    var Tuesday = sequelize.define('Tuesday', {
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Tuesday.belongsTo(models.Schedule, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Tuesday;
};