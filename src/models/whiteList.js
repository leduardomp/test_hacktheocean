const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('whiteList', {
    id_black_list: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_embarcacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'embarcacion_pesca',
        key: 'id_embarcacion'
      }
    },
    usuario_alta: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'email'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'white_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_black_list" },
        ]
      },
      {
        name: "fk_black_list_embarcacion_pesca1_idx",
        using: "BTREE",
        fields: [
          { name: "id_embarcacion" },
        ]
      },
      {
        name: "fk_black_list_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "usuario_alta" },
        ]
      },
    ]
  });
};
