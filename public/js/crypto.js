require('dotenv').config()
const cryptojs = require("crypto");
const algorithm = process.env.ALG;
const initVector = process.env.INIT_VECTOR;
const Securitykey = process.env.SECRET_KEY;


const crypto = {

    encrypt: function (text) {
        text = text.toString();
        const cipher = cryptojs.createCipheriv(algorithm, Securitykey, initVector);
        let encryptedData = cipher.update(text, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    },

    decrypt: function (text) {
        const decipher = cryptojs.createDecipheriv(algorithm, Securitykey, initVector);
        let decryptedData = decipher.update(text, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    },

    getToken: function (length) {
        return cryptojs.randomBytes(length).toString('hex');
    }
};

module.exports = {
    crypto
}

