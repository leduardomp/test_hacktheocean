import sequelize from '../config/db.sequelize'
import initModels from '../models/init-models'

const models = initModels(sequelize)

function salvarImagen(logo) {
    let ruta = `./img/${EDlogoFile.name}`
    logo.mv(ruta, err => {
        if(err) return null
        return ruta
    })
}

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    await models.empresaAfiliada.findAll({})
        .then(usuarios => {
            res.status(200).json({
                accion: 1,
                data: usuarios,
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

// Find a single Accion with an id 
exports.findOne = async (req, res) => {
    const { idEmpresa } = req.params;
    await models.empresaAfiliada.findAll({
        where: {
            id_empresa_afiliada: idEmpresa
        }
    })
        .then(empresas => {
            res.status(200).json({
                accion: 1,
                data: empresas[0],
                meesage: 'Empresa found'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || "Error bringing empresa by id"
            })
        })
};

// Create and save new Accion
exports.create = async (req, res) => {

    const {
        nombre,
        direccion,
        telContacto,
        longitud,
        latitud,
        promocion
    } = req.body;

    let urlLogo = ""
    if(req.files)
        urlLogo = salvarImagen(req.files.file);

    await models.empresaAfiliada.create({
        nombre: nombre,
        direccion: direccion,
        telefono_contacto: telContacto,
        url_logo: urlLogo,
        promocion: promocion,
        latitud: latitud,
        longitud: longitud,
    })
        .then(empresa => {
            res.status(201).json({
                accion: 1,
                message: 'Empresa Create'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || "Error to create User "
            })
        })
};

// Update an Accion 
exports.update = async (req, res) => {

    const {
        idEmpresa,
        nombre,
        direccion,
        telContacto,
        localizacion,
        logo,
        promocion
    } = req.body;

    const urlLogo = salvarImagen(logo);

    await models.empresaAfiliada.update(
        {
            id_tipo_usuario: idTipoUsuario,
            nombre: nombre,
            ap_paterno: apPaterno,
            ap_materno: apMaterno,
            tel_contacto: telContacto
        },
        {
            where: { id_empresa_afiliada: idEmpresa }
        }
    )
        .then(empresa => {
            res.status(200).json({
                accion: 1,
                message: 'User Updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || "Error updating user"
            })
        })
};

// Delete an Accion
exports.delete = async (req, res) => {
    const { idEmpresa } = req.params;
    await models.usuario.update(
        {
            activo: false
        },
        {
            where: { id_empresa_afiliada: idEmpresa }
        }
    )
        .then(deleteCatAccion => {
            res.status(200).json({
                accion: 1,
                message: 'User deleted'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || 'The user not be deleted'
            })
        })
};