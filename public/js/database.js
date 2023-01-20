require('dotenv').config()

const { MongoClient } = require("mongodb");
const DB_USER = process.env.DB_USER;
const DB_PSW = process.env.DB_PSW;

const uri = "mongodb+srv://" + DB_USER + ":" + DB_PSW + "@default-cluster.lgfcuh0.mongodb.net/test";

const client = new MongoClient(uri, {
    useUnifiedTopology: true,
});

const dbUtils = {
    connectToDabase: function () {
        client.connect().then(() => {
            console.log("Connection to database established...");
        });
    },

    //TODO: return different results to redirect in case user has been found, user not found or error
    registerUser: async function (userDocument) {

        if (!await this.findUser(userDocument)) {
            await client.db("Atmos-com").collection("Users").insertOne(userDocument).then(() => {
                console.log("Register succesful: document inserted");
                return true;
            }).catch((error) => {
                console.log(error);
                return false;
            });
        } else {
            console.log("Register failed: document found");
        }

        return false;
    },

    findUser: async function (user) {
        var foundUser = await client.db("Atmos-com").collection("Users").findOne(user);
        return foundUser;
    },

    findQuery: async function (key, value) {
        var foundUser = await client.db("Atmos-com").collection("Users").findOne({ [key]: value });
        return foundUser;
    },

    updateUser: async function (user, element, value) {
        await client.db("Atmos-com").collection("Users").updateOne(
            user,
            {
                $set: { [element]: value }
            }

        );
    },

    removeExpirationToken: async function (user) {
        await client.db("Atmos-com").collection("Users").updateOne(user, { $unset: { passwordResetToken: "", passwordResetTokenExpiration: "" } });
    },

    deleteIf: async function (collection, condition) {
        await client.db("Atmos-com").collection(collection).deleteOne(condition);
    }

}


module.exports = {
    dbUtils
}