// const mongodb = require('mongodb');
// const mongoclient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;
const mongoose = require('mongoose');

let database;

async function getdatabase(){
    // const client = await mongoclient.connect('mongodb://127.0.0.1:27017')
    // database = client.db('Office')

    // if(!database) {console.log('Database Not connected');}

    // return database;
    mongoose.connect('mongodb://127.0.0.1:27017/Office')
    .then(()=>{
        console.log('Database Connected!')
    }).catch(() => {
        console.log("Database Not Connected ?");
    });
}

module.exports = {
    getdatabase,
    // ObjectID
}
