const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'KeyValue',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            key: {
                type: DataTypes.STRING,
                alloeNull: false,
            },
            value: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'KeyValue',
            timestampe: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{name: 'id'}],
                },
                {
                    name: 'key',
                    unique: true,
                    fields: [{name: 'key'}]
                },
            ],
        },
    );
};