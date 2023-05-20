const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@safoundb.d2yflbg.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const galleryCollectionOne = client.db("Toytopia").collection("galleryOne");
        const galleryCollectionTwo = client.db("Toytopia").collection("galleryTwo");

        app.get("/gallery-one", async (req, res) => {
            const cursor = galleryCollectionOne.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get("/gallery-two", async (req, res) => {
            const cursor = galleryCollectionTwo.find();
            const result = await cursor.toArray();
            res.send(result);
        })



        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You are successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Toytopia is running");
})

app.listen(port, () => {
    console.log(`Toytopia is running on port : ${port}`);
})