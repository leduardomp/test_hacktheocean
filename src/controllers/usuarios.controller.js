import crypto from 'crypto'
import sequelize from '../config/db.sequelize'
import initModels from '../models/init-models'
import nodemailer from 'nodemailer';

const models = initModels(sequelize)

function generaPassword() {
    const hoy = new Date()
    const password = "yheOcean".concat(hoy.getFullYear()).concat(hoy.getMonth()).concat(hoy.getDay()).concat(hoy.getHours()).concat(hoy.getMinutes()).concat(hoy.getMilliseconds()).concat(randomNumber(0, 100))
    return password
}

function randomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
}

function generaSalt() {
    return "".concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9)).concat(randomNumber(0, 9))
}

// Retrieve all accions from the database.
exports.findAll = async (req, res) => {
    await models.usuario.findAll({})
        .then(usuarios => {
            res.status(200).json({
                accion: 1,
                data: usuarios,
                message: 'lista usuarios'
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

    console.log(req.params)

    const { idUsuario } = req.params;
    await models.usuario.findAll({
        where: {
            email: idUsuario
        }
    })
        .then(usuario => {
            res.status(200).json({
                accion: 1,
                data: usuario[0],
                meesage: 'User found'
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || "Error bringing user by id"
            })
        })
};

// Create and save new Accion
exports.create = async (req, res) => {
    const { email, idTipoUsuario, nombre, apPaterno, apMaterno, telContacto } = req.body;

    console.log(email)
    console.log(apMaterno)
    console.log(apPaterno)

    const salt = generaSalt()
    const passwordTmp = generaPassword();
    const password = crypto.createHash('sha1').update(passwordTmp + salt).digest('hex')

    await models.usuario.create({
        email: email,
        id_tipo_usuario: idTipoUsuario,
        nombre: nombre,
        ap_paterno: apPaterno,
        ap_materno: apMaterno,
        password: password,
        salt: salt,
        tel_contacto: telContacto
    })
        .then(usuario => {
            //enviar email con contraseña
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'oceanthreadglobal@gmail.com',
                    pass: 'LaunchXXX'
                }
            });

            let mensaje = `Hola ${nombre} ${apPaterno}, \n\n`;
            mensaje += `Gracias por formar parte de Ocean Thread, juntos haremos un mundo mejor \n\n\n\n`;
            mensaje += `Su contraseña es: ${passwordTmp} \n\n\n\n`;
            mensaje += `Es un gsto que te sumes a esta causa \n\n\n`;
            mensaje += `Atte: Equipo de Ocean Thread \n\n\n`;

            let mailOptions = {
                from: 'oceanthreadglobal@gmail.com',
                to: email,
                subject: 'Alta sistema Ocean Thread',
                text: mensaje
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(500).send({
                        accion: 0,
                        message: err.message || "Error to create User "
                    })
                }
            });

            res.status(201).json({
                accion: 1,
                message: 'User Create'
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

    const { email, idTipoUsuario, nombre, apPaterno, apMaterno, telContacto } = req.body;

    await models.usuario.update(
        {
            id_tipo_usuario: idTipoUsuario,
            nombre: nombre,
            ap_paterno: apPaterno,
            ap_materno: apMaterno,
            tel_contacto: telContacto
        },
        {
            where: { email: email }
        }
    )
        .then(updateCatAccion => {
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
    const { idUsuario } = req.params;
    await models.usuario.update(
        {
            activo: false
        },
        {
            where: { email: idUsuario }
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