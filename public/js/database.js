require('dotenv').config()

const { MongoClient, ObjectID } = require("mongodb");
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

    registerUser: async function (userDocument) {
        await client.db("Atmos-com").collection("Users").insertOne(userDocument);
    },

    findUser: async function (user) {
        var foundUser = await client.db("Atmos-com").collection("Users").findOne(user);
        return foundUser;
    }
}


module.exports = {
    dbUtils
}