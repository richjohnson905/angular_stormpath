'use strict';

module.exports = function(sequelize, DataTypes) {
    var Consumer = sequelize.define('Consumer', {
        name: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                Consumer.belongsToMany(models.Provider, {
                    through: 'Provider_Consumer',
                    foreignKey: 'Consumer_rowId'
                }),
                Consumer.belongsTo(models.Storm, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Consumer;
};