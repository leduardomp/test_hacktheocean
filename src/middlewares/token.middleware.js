let jwt = require('jsonwebtoken')
let sequelize = require('../config/db.sequelize')
let initModels = require('../models/init-models')

const models = initModels(sequelize)

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).send({
                    idError: '1ex',
                    message: err.message || "Error token"
                })
            }

            console.log("Antes de validar en base")

            //validar que exista en BD
            models.usuario.findAll({ where: { email: user.username } })
                .then(users => {

                    if (users.length !== 1)
                        return res.status(404).send({
                            idError: 2,
                            message: "Error Token incorrecto"
                        })

                    if (users.length == 1) {

                        if (users[0].access_token != token)
                            return res.status(404).send({
                                idError: 3,
                                message: "Error Token incorrecto"
                            })
                    }


                    //Regresa usuario y el token es valido
                    req.user = user
                    next()
                })
                .catch(err => {
                    return res.status(404).send({
                        idError: 1,
                        message: err.message || "Error Token user"
                    })
                })
        })
    } else {
        return res.status(401).send({
            idError: '2twn',
            message: "Error token"
        })
    }
}

exports.generateAccessToken = (valores) => {
    return jwt.sign(valores, process.env.SECRET_TOKEN, { expiresIn: process.env.TIME_LIFE_TOKEN });
}