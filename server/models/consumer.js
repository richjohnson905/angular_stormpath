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
                });
            }
        }
    });
    return Consumer;
};