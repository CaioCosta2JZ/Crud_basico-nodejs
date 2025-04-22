module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'aluno',
        freezeTableName: true
    });
    
    Aluno.associate = (models) => {
         Aluno.belongsTo (models.Curso, {foreignKey: "cursoId", as: "Curso,"});

    }

    return Aluno;
};