'use strict';

module.exports = function(sequelize, DataTypes) {
    var Provider = sequelize.define('Provider', {
        providerType: DataTypes.ENUM('groupOpen', 'groupClosed', 'oneOnOne', 'oneTime'),
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        stormId: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                Provider.belongsToMany(models.Consumer, {
                    through: 'Provider_Consumer',
                    foreignKey: 'Provider_rowId'
                }),
                Provider.hasMany(models.Schedule, {
                    as: 'ProviderSchedule'
                });
            }
        }
    });
    return Provider;
};