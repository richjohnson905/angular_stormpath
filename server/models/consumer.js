'use strict';

module.exports = function(sequelize, DataTypes) {
    var Consumer = sequelize.define('Consumer', {
        name: DataTypes.STRING,
        stormId: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                Consumer.belongsToMany(models.Provider, {
                    through: 'Provider_Consumer',
                    foreignKey: 'Consumer_rowId'
                }),
                Consumer.belongsToMany(models.WiredGroup, {
                    through: 'WiredGroup_Consumer',
                    foreignKey: 'Consumer_rowId'
                }),
                Consumer.hasOne(models.Event);
            }
        }
    });
    return Consumer;
};