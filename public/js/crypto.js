require('dotenv').config()
const cryptojs = require("crypto");
const algorithm = process.env.ALG;
const initVector = cryptojs.randomBytes(16);
const Securitykey = cryptojs.randomBytes(32);


const crypto = {

    encrypt: function (text) {
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
    }
};

module.exports = {
    crypto
}

