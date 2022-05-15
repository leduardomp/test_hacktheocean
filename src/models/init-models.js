var DataTypes = require("sequelize").DataTypes;
var _embarcacionPesca = require("./embarcacionPesca");
var _empresaAfiliada = require("./empresaAfiliada");
var _estatusRedPesca = require("./estatusRedPesca");
var _redPesca = require("./redPesca");
var _tipoUsuario = require("./tipoUsuario");
var _usuario = require("./usuario");
var _whiteList = require("./whiteList");

function initModels(sequelize) {
  var embarcacionPesca = _embarcacionPesca(sequelize, DataTypes);
  var empresaAfiliada = _empresaAfiliada(sequelize, DataTypes);
  var estatusRedPesca = _estatusRedPesca(sequelize, DataTypes);
  var redPesca = _redPesca(sequelize, DataTypes);
  var tipoUsuario = _tipoUsuario(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var whiteList = _whiteList(sequelize, DataTypes);

  redPesca.belongsTo(embarcacionPesca, { as: "id_embarcacion_embarcacion_pesca", foreignKey: "id_embarcacion"});
  embarcacionPesca.hasMany(redPesca, { as: "red_pescas", foreignKey: "id_embarcacion"});
  whiteList.belongsTo(embarcacionPesca, { as: "id_embarcacion_embarcacion_pesca", foreignKey: "id_embarcacion"});
  embarcacionPesca.hasMany(whiteList, { as: "white_lists", foreignKey: "id_embarcacion"});
  redPesca.belongsTo(estatusRedPesca, { as: "id_estatus_red_pesca_estatus_red_pesca", foreignKey: "id_estatus_red_pesca"});
  estatusRedPesca.hasMany(redPesca, { as: "red_pescas", foreignKey: "id_estatus_red_pesca"});
  usuario.belongsTo(tipoUsuario, { as: "id_tipo_usuario_tipo_usuario", foreignKey: "id_tipo_usuario"});
  tipoUsuario.hasMany(usuario, { as: "usuarios", foreignKey: "id_tipo_usuario"});
  embarcacionPesca.belongsTo(usuario, { as: "usuario_propietario_usuario", foreignKey: "usuario_propietario"});
  usuario.hasMany(embarcacionPesca, { as: "embarcacion_pescas", foreignKey: "usuario_propietario"});
  whiteList.belongsTo(usuario, { as: "usuario_alta_usuario", foreignKey: "usuario_alta"});
  usuario.hasMany(whiteList, { as: "white_lists", foreignKey: "usuario_alta"});

  return {
    embarcacionPesca,
    empresaAfiliada,
    estatusRedPesca,
    redPesca,
    tipoUsuario,
    usuario,
    whiteList,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
