const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('embarcacionPesca', {
    id_embarcacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    usuario_propietario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'email'
      }
    },
    matricula: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    num_tripulacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'embarcacion_pesca',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_embarcacion" },
        ]
      },
      {
        name: "fk_embarcacion_pesca_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "usuario_propietario" },
        ]
      },
    ]
  });
};
