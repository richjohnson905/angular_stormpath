'use strict';

module.exports = function(sequelize, DataTypes) {
    var Provider = sequelize.define('Provider', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                Provider.hasMany(models.Schedule),
                Provider.belongsTo(models.Storm, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Provider;
};