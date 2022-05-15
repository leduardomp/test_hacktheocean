import sequelize from '../config/db.sequelize'
import initModels from '../models/init-models'
import redPesca from '../models/redPesca';

const models = initModels(sequelize)

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    await models.redPesca.findAll({})
        .then(redPesca => {
            res.status(200).json({
                accion: 1,
                data: redPesca,
                message: 'lista de Redes de pesca'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error to find all fishing nets"
            })
        })
};

// Find a single Accion with an id 
exports.findOne = async (req, res) => {

    console.log(req.params)

    const { idRedPesca } = req.params;
    await models.redPesca.findAll({
        where: {
            id_red_pesca: idRedPesca
        }
    })
        .then(redPesca => {
            res.status(200).json({
                accion: 1,
                data: redPesca[0],
                meesage: 'Fishing net found'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error bringing fishing net by id"
            })
        })
};

// Create and save new Accion
exports.create = async (req, res) => {
    const { idRedPesca, idEmbarcacion, isEstatusRedPesca, codigoQR, fechaAlta, fechBaja,  } = req.body;

    await models.redPesca.create({
        id_red_pesca: idRedPesca,
        id_embarcacion: idEmbarcacion,
        id_estatus_red_pesca: isEstatusRedPesca,
        codigo_qr: codigoQR,
        fecha_alta: fechaAlta,
        fecha_baja: fechBaja
    })
        .then(redPesca => {
            res.status(201).json({
                accion: 1,
                message: 'Fishing net Create'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error to create fishing net "
            })
        })
};

// Update an Accion 
exports.update = async (req, res) => {
    const { idRedPesca, isEstatusRedPesca, codigoQR, fechaAlta, fechBaja,  } = req.body;

    await models.redPesca.update(
        {
            id_estatus_red_pesca: isEstatusRedPesca,
            codigo_qr: codigoQR,
            fecha_alta: fechaAlta,
            fecha_baja: fechBaja
        }, {
        where: { id_red_pesca: idRedPesca }
    })
        .then(redPesca => {
            res.status(200).json({
                accion: 1,
                message: 'Fishing net Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating fishing net"
            })
        })
};

// Delete an Accion
exports.delete = async (req, res) => {
    const { idRedPesca } = req.params;
    await models.redPesca.update(
        {
            activo: false
        },
        {
            where: { id_red_pesca: idRedPesca }
        }
    )
        .then(redPesca => {
            res.status(200).json({
                accion: 1,
                message: 'Fishing net deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || 'The fishing net could not be deleted'
            })
        })
};