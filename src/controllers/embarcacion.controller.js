import sequelize from '../config/db.sequelize'
import initModels from '../models/init-models'

const models = initModels(sequelize)

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    await models.embarcacionPesca.findAll({})
        .then(embarcacionPesca => {
            res.status(200).json({
                accion: 1,
                data: embarcacionPesca,
                message: 'lista Embarcacion'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error to find all embarcaciones"
            })
        })
};

// Find a single Accion with an id 
exports.findOne = async (req, res) => {

    console.log(req.params)

    const { idEmbarcacion } = req.params;
    await models.embarcacionPesca.findAll({
        where: {
            id_embarcacion: idEmbarcacion
        }
    })
        .then(embarcacionPesca => {
            res.status(200).json({
                accion: 1,
                data: embarcacionPesca[0],
                meesage: 'Boat found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error bringing boat by id"
            })
        })
};

// Create and save new Accion
exports.create = async (req, res) => {
    const { idembarcacion, usuariopropietario, matricula, numtripulacion } = req.body;

    await models.embarcacionPesca.create({
        id_embarcacion: idembarcacion,
        usuario_propietario: usuariopropietario,
        matricula: matricula,
        num_tripulacion: numtripulacion
    })
        .then(embarcacionPesca => {
            res.status(201).json({
                accion: 1,
                message: 'Boat Create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error to create Boat "
            })
        })
};

// Update an Accion 
exports.update = async (req, res) => {
    const { idembarcacion, usuariopropietario, matricula, numtripulacion } = req.body;

    await models.embarcacionPesca.update(
        {
            usuario_propietario: usuariopropietario,
            matricula: matricula,
            num_tripulacion: numtripulacion
        }, {
        where: { id_embarcacion: idembarcacion }
    })
        .then(embarcacionPesca => {
            res.status(200).json({
                accion: 1,
                message: 'Boat Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Boat"
            })
        })
};

// Delete an Accion
exports.delete = async (req, res) => {
    const { idEmbarcacion } = req.params;
    await models.embarcacionPesca.update(
        {
            activo: false
        },
        {
            where: { id_embarcacion: idEmbarcacion }
        }
    )
        .then(embarcacionPesca => {
            res.status(200).json({
                accion: 1,
                message: 'Boat deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || 'The Boat could not be deleted'
            })
        })
};