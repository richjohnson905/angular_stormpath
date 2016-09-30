'use strict';

module.exports = function(sequelize, DataTypes) {
    var WiredGroup = sequelize.define('WiredGroup', {
        date: DataTypes.DATEONLY
    },{
        classMethods: {
            associate: function(models) {
                WiredGroup.belongsToMany(models.Consumer, {
                    through: 'WiredGroup_Consumer',
                    foreignKey: 'WiredGroup_rowId'
                }),
                WiredGroup.belongsTo(models.Nut, {
                    as: 'WiredGroupNut'
                });
            }
        }
    });
    return WiredGroup;
};