import sequelize from '../config/db.sequelize'
import initModels from '../models/init-models'

// Require the package
import QRCode from 'qrcode'

const models = initModels(sequelize)

// Find a single Accion with an id 
exports.create = async (req, res) => {

    console.log(req.params)

    const { idEmbarcacion } = req.params;

    await models.embarcacionPesca.findAll({
        where: {
            id_embarcacion: idEmbarcacion
        }
    })
        .then(embarcacionPesca => {

            let dataQr = {
                idEmbarcacion : idEmbarcacion
            }

            // Print the QR code to terminal
            QRCode.toString(
                JSON.stringify(dataQr),
                {type:'terminal'},
                function (err, QRcode) {
                    if(err) return console.log("error occurred")
                    // Printing the generated code
                    console.log(QRcode)
            })

            res.status(200).json({
                accion: 1,
                data: embarcacionPesca[0]
            })
        })
        .catch(err => {
            res.status(500).send({
                accion: 0,
                message: err.message || "Error bringing user by id"
            })
        })
};




 


// Converting the data into base64
//QRCode.toDataURL(stringdata, function (err, code) {
//    if(err) return console.log("error occurred")
 
    // Printing the code
//    console.log(code)
//})