const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://faisalmujtaba2005:$elf_F0Rm_Db@form-submission-db.7mtfr3n.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'Forms';

async function main(req_data) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('form');

    const insertedDocument = await collection.insertMany([req_data])
    console.log(insertedDocument);

    const documents = await collection.find().toArray();
    console.log(documents);

    return `done.`;
}

module.exports = {
    main,
    client
};