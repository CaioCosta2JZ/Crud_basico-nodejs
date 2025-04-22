module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professor", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }, {
        tableName: 'professor',
        freezeTableName: true
    });
    return Professor;
}