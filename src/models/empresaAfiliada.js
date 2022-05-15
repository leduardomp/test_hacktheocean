const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresaAfiliada', {
    id_empresa_afiliada: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telefono_contacto: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    url_logo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    promocion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    activo: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'empresa_afiliada',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_empresa_afiliada" },
        ]
      },
    ]
  });
};
