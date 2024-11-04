import Express, { json, Router } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import { config } from "dotenv";

var CONNECTION_STRING =
  "mongodb+srv://admin:q9cdDMSUh73zvwD@cluster0.w9zzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "meandemoapp"; // MEAN demo app
var DATABASE_COLLECTION = "meandemoappcollection"; // MEAN demo app
var database;

config();
const connectionString = process.env.MONGODB_URI || "";
const databaseName = process.env.MONGODB_DATABASE_NAME || "";
const collectionName = process.env.MONGODB_COLLECTION_NAME || "";
const serverPort = process.env.SERVER_PORT || 8000;
console.log("<<<<<<< Configuration: >>>>>>>");
console.log("\tserverPort", serverPort);
console.log("\tdatabaseName=", databaseName);
console.log("\tcollectionName=", collectionName);
console.log("\tconnectionString=", connectionString);
console.log("<<<<<<< Configuration - End >>>>>>>");

var app = Express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
// app.use(cors);
app.use(json());

const OBJ_OBJECTS = {
  objIcon: "",
  objType: "",
  objName: "",
  connectionStatus: "",
};

const OBJ_SUBTYPE = {
  subtype: "",
  subtypeIcon: "",
  objects: [OBJ_OBJECTS],
};

const OBJ_TYPE = {
  type: "",
  typeIcon: "",
  subtypes: [OBJ_SUBTYPE],
};

/*
  Success ==> status 200 (OK), message whatever.
  Not Found ==> status 200 (OK -> Request Completed Successfully), suitable message, data is [].
  Error/Failure ==> status 400 (Bad Request), suitable message, data is null.
  Server Error ==>  status 500 (Server Error), suitable message, data is null.
 */
const resultJson = {
  status: 0,
  message: "",
  data: [OBJ_TYPE],
};

// Connect to MongoDB: initialize 'conn' and 'db'
let conn;
const client = new MongoClient(connectionString);
try {
  conn = await client.connect();
} catch (err) {
  console.error(err);
}
let db = conn.db(DATABASE_NAME);
// Connect to MongoDB - End

async function connect() {
  try {
    await MongoClient.connect(connectionString);
    console.log("async connect -- Successful Connection to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(5038, "127.0.0.1", () => {
  MongoClient.connect(connectionString, (error, mongoClient) => {
    database = mongoClient.db(databaseName);
    console.log("MongoDB Connection Successful on port " + serverPort);
  });
});

// GET /api/search/v1/ping
app.get("/api/search/v1/ping", (req, res) => {
  console.log("Ping: Server is up and running, ready to receive requests");
  const messageString = {
    message: "Server is up and running, ready to receive requests",
  };
  res.json(messageString);
});

//  GET /api/search/v1/:category/:name
app.get("/api/search/v1/:category/:name", async (req, res) => {
  try {
    console.log("GET '/api/mean/search/:category/:name'");
    console.log("\tcategory=" + req.params.category);
    console.log("\tname=" + req.params.name);

    const database = client.db("meandemoapp");
    const myCollection = database.collection("meandemoappcollection");

    const options = {
      // Sort returned documents in ascending order by title (A->Z)
      sort: { type: 1, subtype: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: {
        _id: 0,
        type: 1,
        subtype: 1,
        objects: 1,
      },
    };

    var query = {};
    const category =
      req.params.category.charAt(0).toUpperCase() +
      req.params.category.slice(1).toLowerCase();
    if (category !== "All") {
      query.type = category;
    }

    const stringSearch = req.params.name;
    if (stringSearch.trim().length > 0) {
      query.subtype = stringSearch;
    }

    console.log("\tcategory=" + category);
    console.log("\tname=" + stringSearch.trim());
    console.log("\tquery=", query);

    let objResults = resultJson;
    let results = await myCollection.find({ query }).toArray();
    console.log("GET /api/mean/search/:category/:name \n\tresults=", results);

    const cursor = await myCollection.find(query, options);

    // Print a message if no documents were found
    if ((await myCollection.countDocuments(query)) === 0) {
      console.log("No documents found!");
      objResults.status = 200;
      objResults.message =
        "GET '/api/mean/search/:category/:name', category='" +
        req.params.category +
        "', text='" +
        req.params.name +
        "' No documents found matching the query.";
      objResults.data = [];
      res.json(results).status(200);
    }

    // Print returned documents
    for await (const doc of cursor) {
      console.dir(doc);
    }

    objResults.status = 200;
    objResults.message =
      "GET '/api/mean/search/:name', category='" +
      req.params.category +
      "', text='" +
      req.params.name +
      "'";
    objResults.data = cursor;
    res.json(objResults).status(200);

    const messageString = {
      message:
        "GET '/api/mean/search/:name', category='" +
        req.params.category +
        "', name='" +
        req.params.name +
        "'",
    };
    res.json(messageString);
    // res.send(results).status(200);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

//  GET /api/search/v1/getAll
app.get("/api/search/v1/getAll", (request, response) => {
  console.log("GET /api/getAll");
  database
    .collection(DATABASE_COLLECTION)
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});
