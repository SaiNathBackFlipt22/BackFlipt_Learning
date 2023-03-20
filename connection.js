const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);



async function main() {
    // Use connect method to connect to the server
    // console.log('Connected successfully to server');
    await client.connect();
    db = await client.db('snacksManagement');
    collection =await  db.collection('menu');
    return collection

}

module.exports = main;