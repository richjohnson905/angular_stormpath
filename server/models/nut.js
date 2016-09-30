'use strict'

module.exports = function(sequelize, DataTypes) {
    var Nut = sequelize.define('Nut',{
        day: DataTypes.ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
        hour: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                Nut.belongsTo(models.Schedule,{
                    OnDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                }),
                Nut.hasOne(models.WiredGroup);
            }
        }
    });
    return Nut;
}