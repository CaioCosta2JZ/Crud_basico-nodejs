module.exports = (sequelize, DataTypes) => { 
   const Sala = sequelize.define("Sala", { 
   nome: { 
   type: DataTypes.STRING, 
   allowNull: false, 
    }, 
    valor: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    }, 
    }); 
   
    
   
   Produto.associate = (models) => { 
   
   // O alias deve ser 'Categoria' para corresponder ao alias na consulta 
    Produto.belongsTo(models.Categoria, { 
    foreignKey: "salaId", 
    as: "Sala", // Use o alias consistente com as consultas 
   }); 
}; 
   
    
   
  return Sala; 
   
   }; 