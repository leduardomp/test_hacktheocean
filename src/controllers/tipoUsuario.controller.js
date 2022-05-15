import sequelize from '../config/db.sequelize'
import initModels from '../models/init-models'
import tipoUsuario from '../models/tipoUsuario';

const models = initModels(sequelize)

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    await models.tipoUsuario.findAll({})
        .then(tiposUsuario => {
            res.status(200).json({
                accion: 1,
                data: tiposUsuario,
                message: 'lista empresas afiliadas'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || "Error to find all users"
            })
        })
};
