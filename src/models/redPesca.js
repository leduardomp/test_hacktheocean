const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('redPesca', {
    id_red_pesca: {
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
    id_estatus_red_pesca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estatus_red_pesca',
        key: 'id_estatus_red_pesca'
      }
    },
    codigo_qr: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    fecha_alta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_baja: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'red_pesca',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_red_pesca" },
        ]
      },
      {
        name: "fk_red_pesca_embarcacion_idx",
        using: "BTREE",
        fields: [
          { name: "id_embarcacion" },
        ]
      },
      {
        name: "fk_red_pesca_estatus_red_pesca1_idx",
        using: "BTREE",
        fields: [
          { name: "id_estatus_red_pesca" },
        ]
      },
    ]
  });
};
