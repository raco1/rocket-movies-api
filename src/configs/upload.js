const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads")

const MULTER = {
    storage: multer.diskStorage({
        destination: path.resolve(TMP_FOLDER),
        filename(request, file, callback){
            const fileHashed = crypto.randomBytes(10).toString("hex")
            const filename = `${fileHashed}-${file.originalname}`

            return callback(null, filename)
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}