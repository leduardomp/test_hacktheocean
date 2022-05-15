const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    id_tipo_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'tipo_usuario',
        key: 'id_tipo_usuario'
      }
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ap_paterno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ap_materno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    tel_contacto: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    access_token: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "fk_usuario_tipo_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "id_tipo_usuario" },
        ]
      },
    ]
  });
};
